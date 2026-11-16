# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0]

### Changed

- Store visual- and insert-mode defaults in their nonrecursive mapping arrays, allowing individual overrides through the standard VSCodeVim mapping arrays while retaining other defaults. Normal-mode defaults already use this approach.
- Supplied visual- and insert-mode mappings now execute nonrecursively. Existing recursive overrides retain priority, but users who previously replaced entire arrays now inherit unrelated defaults; set the corresponding nonrecursive array to `[]` to keep a mode fully custom.
- Remove the duplicate normal-mode `<leader>y` mapping.

### Added

- Document how to override, disable, move, and restore Vim mappings and customize VS Code shortcuts using native configuration.

## [0.0.1]

- Initial release
