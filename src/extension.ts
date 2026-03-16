import * as vscode from 'vscode';
import { vim } from './keybindings';

interface Keybinding {
  before: string[];
  after?: string[];
  commands?: string[];
  when?: string;
}

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  await applyKeybindings();
}

async function applyKeybindings(): Promise<void> {
  const vimConfig = vscode.workspace.getConfiguration('vim');

  await mergeKeybindings(
    vimConfig,
    'normalModeKeyBindingsNonRecursive',
    vim.normalModeKeyBindingsNonRecursive
  );

  await mergeKeybindings(
    vimConfig,
    'visualModeKeyBindings',
    vim.visualModeKeyBindings
  );

  await mergeKeybindings(
    vimConfig,
    'insertModeKeyBindings',
    vim.insertModeKeyBindings
  );
}

async function mergeKeybindings(
  vimConfig: vscode.WorkspaceConfiguration,
  configKey: string,
  extensionDefaults: Keybinding[]
): Promise<void> {

  const userBindings = (vimConfig.get(configKey) || []) as Keybinding[];
  const extensionBindingKeys = new Set(extensionDefaults.map((b) => bindingKey(b)));

  const merged = [
    ...extensionDefaults,
    ...userBindings.filter((b) => !extensionBindingKeys.has(bindingKey(b))),
  ];

  if (!areEqual(userBindings, merged)) {
    await vimConfig.update(configKey, merged, vscode.ConfigurationTarget.Global);
  }
}

function bindingKey(binding: Keybinding): string {
  return JSON.stringify(binding.before);
}

function areEqual(a: Keybinding[], b: Keybinding[]): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function deactivate(): void { }
