import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Mapping } from '../src/mappings';
import { GeneratedSettings, SettingsHost, synchronize } from '../src/synchronize';

const recursive = 'normalModeKeyBindings';
const nonRecursive = `${recursive}NonRecursive`;
const mapping = (key: string): Mapping => ({ before: [key], after: [key] });
const defaults = { [`vim.${nonRecursive}`]: [mapping('d')] };

function fixture() {
  const user: Record<string, unknown> = {};
  const custom: Record<string, unknown> = {};
  const generated: GeneratedSettings = {};
  const writes: string[] = [];
  const warnings: string[] = [];
  let saved: GeneratedSettings = {};
  const host: SettingsHost = {
    readCustom: (key) => custom[key] ?? [],
    readUser: (key) => user[key],
    async writeUser(key, value) {
      writes.push(key);
      if (value === undefined) delete user[key];
      else user[key] = structuredClone(value);
    },
    async saveGenerated(value) { saved = structuredClone(value); },
    warn: (message) => warnings.push(message),
  };
  return { user, custom, generated, writes, warnings, host, saved: () => saved,
    run: () => synchronize(host, defaults, generated) };
}

test('no custom mappings leaves manifest defaults active without settings writes', async () => {
  const f = fixture();
  await f.run();
  assert.deepEqual(f.writes, []);
});

test('writes both arrays together, is idempotent, and survives activation', async () => {
  const f = fixture();
  f.custom[recursive] = [mapping('d')];
  await f.run();
  assert.deepEqual(f.user, { [recursive]: [mapping('d')], [nonRecursive]: [] });
  await f.run();
  await synchronize(f.host, defaults, f.saved());
  assert.equal(f.writes.length, 2);
  assert.deepEqual(f.warnings, []);
});

test('removing custom mappings removes generated arrays and restores defaults', async () => {
  const f = fixture();
  f.custom[nonRecursive] = [mapping('x')];
  await f.run();
  assert.deepEqual(f.user[nonRecursive], [mapping('d'), mapping('x')]);
  delete f.custom[nonRecursive];
  await f.run();
  assert.deepEqual(f.user, {});
  assert.deepEqual(f.saved(), {});
});

test('explicit existing arrays, including empty arrays, protect the whole mode', async () => {
  for (const key of [recursive, nonRecursive]) {
    const f = fixture();
    f.user[key] = [];
    f.custom[recursive] = [mapping('x')];
    await f.run();
    assert.deepEqual(f.writes, []);
    assert.match(f.warnings[0], /Move your vim.normalModeKeyBindings/);
    delete f.user[key];
    await f.run();
    assert.equal(f.writes.length, 2);
  }
});

test('manual edits to generated arrays are preserved', async () => {
  const f = fixture();
  f.custom[recursive] = [mapping('x')];
  await f.run();
  f.user[nonRecursive] = [mapping('manual')];
  f.custom[recursive] = [mapping('changed')];
  await f.run();
  assert.equal(f.writes.length, 2);
  assert.deepEqual(f.user[nonRecursive], [mapping('manual')]);
  assert.deepEqual(f.user[recursive], [mapping('x')]);
});

test('partial failures checkpoint successful writes and can be retried', async () => {
  const f = fixture();
  f.custom[recursive] = [mapping('x')];
  const write = f.host.writeUser;
  f.host.writeUser = async (key, value) => {
    if (key === nonRecursive) throw new Error('read only');
    await write(key, value);
  };
  await assert.rejects(f.run(), /read only/);
  assert.deepEqual(f.saved(), { [recursive]: [mapping('x')] });
  f.host.writeUser = write;
  await synchronize(f.host, defaults, f.saved());
  assert.deepEqual(f.warnings, []);
  assert.deepEqual(f.user[nonRecursive], [mapping('d')]);
});

test('all three modes merge independently; malformed entries do not block valid ones', async () => {
  const f = fixture();
  f.custom.visualModeKeyBindings = [null, mapping('v')];
  f.custom.insertModeKeyBindingsNonRecursive = [mapping('i')];
  await f.run();
  assert.deepEqual(f.user.visualModeKeyBindings, [mapping('v')]);
  assert.deepEqual(f.user.insertModeKeyBindingsNonRecursive, [mapping('i')]);
  assert.equal(f.warnings.length, 1);
});
