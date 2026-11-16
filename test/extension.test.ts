import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';
import { setImmediate } from 'node:timers/promises';
import type { ExtensionContext } from 'vscode';

test('activation serializes settings events, avoids write loops, and reports errors', async () => {
  const user: Record<string, unknown> = {};
  const custom: Record<string, unknown> = {
    normalModeKeyBindings: [{ before: ['a'], after: ['b'] }],
  };
  const state: Record<string, unknown> = {};
  const warnings: string[] = [];
  const writes: string[] = [];
  let listener: (event: { affectsConfiguration: (key: string) => boolean }) => void;
  let activeWrites = 0;
  let failWrites = false;
  const fire = (key: string) => listener({ affectsConfiguration: (section) => key === section || key.startsWith(`${section}.`) });
  const vscode = {
    ConfigurationTarget: { Global: 1 },
    workspace: {
      getConfiguration: (section: string) => ({
        get: (key: string, fallback: unknown) => custom[key] ?? fallback,
        inspect: (key: string) => ({ globalValue: user[key] }),
        async update(key: string, value: unknown, target: number) {
          assert.equal(section, 'vim');
          assert.equal(target, 1);
          assert.equal(activeWrites++, 0, 'writes must not overlap');
          try {
            await setImmediate();
            if (failWrites) throw new Error('settings unavailable');
            writes.push(key);
            user[key] = value;
            fire(`vim.${key}`);
          } finally {
            activeWrites--;
          }
        },
      }),
      onDidChangeConfiguration: (callback: typeof listener) => {
        listener = callback;
        return { dispose() {} };
      },
    },
    window: { showWarningMessage: (message: string) => { warnings.push(message); } },
  };
  const exports: { activate?: (context: ExtensionContext) => Promise<void> } = {};
  runInNewContext(readFileSync(join(__dirname, '../src/extension.js'), 'utf8'), {
    exports,
    require: (id: string) => id === 'vscode' ? vscode : require(join(__dirname, '../src', id)),
  });
  const context = {
    extension: { packageJSON: { contributes: { configurationDefaults: {} } } },
    subscriptions: [],
    globalState: {
      get: (key: string, fallback: unknown) => state[key] ?? fallback,
      async update(key: string, value: unknown) { state[key] = value; },
    },
  } as unknown as ExtensionContext;
  await exports.activate!(context);
  // Drain the configuration events caused by generated writes.
  for (let i = 0; i < 10; i++) await setImmediate();
  assert.equal(writes.length, 2);
  fire('vimEnhanced.normalModeKeyBindings');
  fire('vimEnhanced.normalModeKeyBindings');
  for (let i = 0; i < 10; i++) await setImmediate();
  assert.equal(writes.length, 2);
  assert.equal(warnings.length, 0);

  custom.normalModeKeyBindings = [{ before: ['x'], after: ['y'] }];
  failWrites = true;
  fire('vimEnhanced.normalModeKeyBindings');
  for (let i = 0; i < 10; i++) await setImmediate();
  assert.match(warnings[0], /could not synchronize mappings.*settings unavailable/);
  failWrites = false;
  fire('vimEnhanced.normalModeKeyBindings');
  for (let i = 0; i < 10; i++) await setImmediate();
  assert.equal(writes.length, 3);
});
