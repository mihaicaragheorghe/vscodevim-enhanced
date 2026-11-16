import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Mapping, mergeMappings, parseMappings } from '../src/mappings';

const map = (key: string, after: string[] = [key]): Mapping => ({ before: [key], after });

test('custom mappings replace either kind of default, retaining unrelated defaults', () => {
  const result = mergeMappings(
    { recursive: [map('a')], nonRecursive: [map('b'), map('c')] },
    { recursive: [map('b', ['r'])], nonRecursive: [map('a', ['n'])] },
  );
  assert.deepEqual(result.recursive, [map('b', ['r'])]);
  assert.deepEqual(result.nonRecursive, [map('c'), map('a', ['n'])]);
});

test('last duplicate wins and recursive custom mappings win across arrays', () => {
  const result = mergeMappings(
    { recursive: [], nonRecursive: [] },
    { recursive: [map('a', ['first']), map('a', ['last'])], nonRecursive: [map('a')] },
  );
  assert.deepEqual(result, { recursive: [map('a', ['last'])], nonRecursive: [] });
});

test('empty actions consume mappings and removing custom mappings restores defaults', () => {
  const defaults = { recursive: [], nonRecursive: [map('a')] };
  const original = structuredClone(defaults);
  assert.deepEqual(mergeMappings(defaults, { recursive: [], nonRecursive: [map('a', [])] }).nonRecursive, [map('a', [])]);
  assert.deepEqual(mergeMappings(defaults, { recursive: [], nonRecursive: [] }), defaults);
  assert.deepEqual(defaults, original);
});

test('token boundaries remain distinct and command arguments survive merging', () => {
  const command: Mapping = { before: ['a', 'b'], commands: [{ command: 'example', args: [{ value: 1 }] }], silent: true };
  const result = mergeMappings({ recursive: [], nonRecursive: [map('ab')] }, { recursive: [command], nonRecursive: [] });
  assert.deepEqual(result, { recursive: [command], nonRecursive: [map('ab')] });
});

test('malformed entries are skipped with warnings, including malformed optional fields', () => {
  const warnings: string[] = [];
  const valid = [map('a', []), { before: ['b'], commands: ['save', { command: 'example', args: [] }] }];
  assert.deepEqual(parseMappings([...valid, null, {}, { before: [], after: [] }, { before: ['a'], after: 1 },
    { before: ['a'], commands: [{ command: 'x', args: 1 }] }, { before: ['a'], after: [], silent: 1 }], (message) => warnings.push(message)), valid);
  assert.equal(warnings.length, 6);
  assert.deepEqual(parseMappings(null, (message) => warnings.push(message)), []);
  assert.equal(warnings.length, 7);
});
