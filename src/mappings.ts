export const modes = ['normal', 'visual', 'insert'] as const;

export interface Mapping {
  before: string[];
  after?: string[];
  commands?: (string | { command: string; args?: unknown[] })[];
  silent?: boolean;
}

export interface MappingPair {
  recursive: Mapping[];
  nonRecursive: Mapping[];
}

const strings = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

export function parseMappings(value: unknown, warn: (message: string) => void): Mapping[] {
  if (!Array.isArray(value)) {
    warn('Expected an array of mappings.');
    return [];
  }
  return value.filter((item, index): item is Mapping => {
    const valid = item !== null && typeof item === 'object' &&
      strings(item.before) && item.before.length > 0 &&
      (item.after !== undefined || item.commands !== undefined) &&
      (item.after === undefined || strings(item.after)) &&
      (item.silent === undefined || typeof item.silent === 'boolean') &&
      (item.commands === undefined || (Array.isArray(item.commands) &&
        item.commands.every((command: unknown) => typeof command === 'string' ||
          (command !== null && typeof command === 'object' &&
            'command' in command && typeof command.command === 'string' &&
            (!('args' in command) || Array.isArray(command.args))))));
    if (!valid) warn(`Mapping ${index + 1} is invalid. Supply a nonempty before string array and after or commands.`);
    return valid;
  });
}

export function mergeMappings(defaults: MappingPair, custom: MappingPair): MappingPair {
  const entries = new Map<string, { mapping: Mapping; recursive: boolean }>();
  // Later entries win; custom mappings override either kind of default.
  for (const pair of [defaults, custom]) {
    for (const recursive of [false, true]) {
      for (const mapping of recursive ? pair.recursive : pair.nonRecursive) {
        entries.set(JSON.stringify(mapping.before), { mapping, recursive });
      }
    }
  }
  const result: MappingPair = { recursive: [], nonRecursive: [] };
  for (const { mapping, recursive } of entries.values()) {
    result[recursive ? 'recursive' : 'nonRecursive'].push(mapping);
  }
  return result;
}
