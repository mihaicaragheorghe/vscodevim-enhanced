import { Mapping, MappingPair, mergeMappings, modes, parseMappings } from './mappings';

export type GeneratedSettings = Record<string, Mapping[]>;

export interface SettingsHost {
  readCustom(key: string): unknown;
  readUser(key: string): unknown;
  writeUser(key: string, value: Mapping[] | undefined): PromiseLike<void>;
  saveGenerated(value: GeneratedSettings): PromiseLike<void>;
  warn(message: string): void;
}

const equal = (a: unknown, b: unknown): boolean => JSON.stringify(a) === JSON.stringify(b);

export async function synchronize(
  host: SettingsHost,
  defaults: Record<string, unknown>,
  generated: GeneratedSettings,
): Promise<void> {
  for (const mode of modes) {
    const keys = [`${mode}ModeKeyBindings`, `${mode}ModeKeyBindingsNonRecursive`];
    if (keys.some((key) => {
      const current = host.readUser(key);
      return current !== undefined &&
        (!Object.hasOwn(generated, key) || !equal(current, generated[key]));
    })) {
      host.warn(`Vim Enhanced: ${mode} mode was left unchanged. Move your vim.${keys[0]} and vim.${keys[1]} mappings to the matching vimEnhanced.* settings, then remove both explicit vim.* arrays from User Settings (JSON).`);
      continue;
    }

    const readCustom = (key: string) => parseMappings(host.readCustom(key),
      (message) => host.warn(`vimEnhanced.${key}: ${message}`));
    const custom: MappingPair = {
      recursive: readCustom(keys[0]),
      nonRecursive: readCustom(keys[1]),
    };
    const merged = mergeMappings({
      recursive: (defaults[`vim.${keys[0]}`] ?? []) as Mapping[],
      nonRecursive: (defaults[`vim.${keys[1]}`] ?? []) as Mapping[],
    }, custom);
    const hasCustom = custom.recursive.length + custom.nonRecursive.length > 0;
    for (const [index, key] of keys.entries()) {
      const output = hasCustom ? (index === 0 ? merged.recursive : merged.nonRecursive) : undefined;
      if (equal(host.readUser(key), output)) continue;
      await host.writeUser(key, output);
      if (output === undefined) delete generated[key];
      else generated[key] = output;
      // Checkpoint each successful write, including when a later write fails.
      await host.saveGenerated({ ...generated });
    }
  }
}
