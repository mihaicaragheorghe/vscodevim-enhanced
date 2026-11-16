import * as vscode from 'vscode';
import { modes } from './mappings';
import { GeneratedSettings, synchronize } from './synchronize';

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  const defaults = context.extension.packageJSON.contributes.configurationDefaults as Record<
    string, unknown
  >;
  const generated = context.globalState.get<GeneratedSettings>('generatedMappings', {});
  const warnings = new Set<string>();
  const host = {
    readCustom: (key: string) => vscode.workspace.getConfiguration('vimEnhanced').get(key, []),
    readUser: (key: string) => vscode.workspace.getConfiguration('vim').inspect(key)?.globalValue,
    writeUser: (key: string, value: unknown) =>
      vscode.workspace.getConfiguration('vim').update(key, value, vscode.ConfigurationTarget.Global),
    saveGenerated: (value: GeneratedSettings) => context.globalState.update('generatedMappings', value),
    warn: (message: string) => {
      if (!warnings.has(message)) {
        warnings.add(message);
        void vscode.window.showWarningMessage(message);
      }
    },
  };
  let pending = Promise.resolve();
  const schedule = () => {
    pending = pending.then(() => synchronize(host, defaults, generated)).catch((error: unknown) => {
      host.warn(`Vim Enhanced could not synchronize mappings: ${String(error)}`);
    });
    return pending;
  };
  context.subscriptions.push(vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration('vimEnhanced') || modes.some((mode) =>
      event.affectsConfiguration(`vim.${mode}ModeKeyBindings`) ||
      event.affectsConfiguration(`vim.${mode}ModeKeyBindingsNonRecursive`))) {
      void schedule();
    }
  }));
  await schedule();
}
