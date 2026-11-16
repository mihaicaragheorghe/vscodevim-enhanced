# Vim Enhanced

Keymaps for [Vim extension](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim) to provide a more authentic vim experience in VS Code. Inspired by kickstart.nvim.

## Installation

Install via [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=mcaragheorghe.vim-enhanced) or [OpenVSX](https://open-vsx.org/extension/mcaragheorghe/vim-enhanced).

## Configuration defaults

The default leader key is `Space`.

```json
{
  "editor.cursorSurroundingLines": 10,
  "vim.leader": "space",
  "vim.showcmd": true,
  "vim.showmodename": true,
  "vim.highlightedyank.enable": true,
  "vim.highlightedyank.color": "#a9dc7660",
  "vim.ignorecase": true,
  "vim.smartcase": true,
  "vim.incsearch": true,
  "vim.hlsearch": true,
  "vim.inccommand": "replace",
  "vim.replaceWithRegister": true,
  "vim.useCtrlKeys": true,
}
```

## Usage

The mapping configuration uses the nvim name shortcuts as:

- `<C>` - `Ctrl`
- `S` - `Shift`
- `A` - `Alt`
- `<leader>` - `Space`

### Workspace Navigation

Use `ctrl` and `hjkl` to move the editor focus. This works for both splitted windows and things like file explorer, terminal, etc.
Use `tab` and `shift+tab` to move between editor tabs.
Use `hjkl` to move in hover windows and file explorer.

| Key                    | Description                     |
| ---------------------- | ------------------------------- |
| `<leader>sf` / `<C-p>` | [S]earch [f]ile                 |
| `<leader>ss`           | [S]earch [s]ymbol               |
| `<leader>/`            | Search in files                 |
| `<C-h>`                | Move focus left                 |
| `<C-j>`                | Move focus down                 |
| `<C-k>`                | Move focus up                   |
| `<C-l>`                | Move focus right                |
| `tab`                  | Next tab                        |
| `<S-tab>`              | Previous tab                    |
| `<C-w>o`               | Maximize / minimize focused tab |
| `]d`                   | Go to next diagnostic           |
| `[d`                   | Go to prev diagnostic           |
| `<leader>ge`           | Open file explorer              |
| `<leader>gs`           | Open source control menu        |
| `<leader>gd`           | Open debug menu                 |
| ``<C-`>``              | Open terminal                   |

Additionally, `ctrl+d`, `ctrl+u`, `n` and `N`(when searching) will also center the screen on jumps.

## Editor Commands

| Key                | Description          |
| ------------------ | -------------------- |
| `<leader><leader>` | Show command palette |
| `<leader>e`        | Hide/show sidebar    |
| `<leader>zz`       | Zen Mode             |
| `<leader>w`        | Save file            |

### File Explorer and File Navigation

| Key          | Description             |
| ------------ | ----------------------- |
| `<leader>ge` | Open explorer           |
| `h`          | Collapse directory      |
| `l`          | Expand directory        |
| `j`          | Move down               |
| `k`          | Move up                 |
| `a` / `%`    | Add new file            |
| `A` / `d`    | Add new directory       |
| `r` / `R`    | Rename file             |
| `D`          | Delete file / directory |
| `x`          | Cut file                |
| `y`          | Copy file               |
| `p`          | Paste file              |
| `v`          | Open file to the side   |

## LSP

| Key                    | Description             |
| ---------------------- | ----------------------- |
| `K`                    | Hover information       |
| `gd`                   | Go to definition        |
| `gpd`                  | Go peek definition      |
| `gI`                   | Go to implementation    |
| `gpI`                  | Go peek implementation  |
| `gr`                   | Go to reference         |
| `gD`                   | Go to declaration       |
| `gt`                   | Go to type definition   |
| `gpt`                  | Go peek type definition |
| `<leader>r`            | Rename                  |
| `<leader>f`            | Format                  |
| `<C-.>` / `<leader>ca` | Quick fix               |

## Suggestions

| Key         | Description                |
| ----------- | -------------------------- |
| `<C-n>`     | Select next suggestion     |
| `<C-p>`     | Select prev suggestion     |
| `<C-y>`     | Accept selected suggestion |
| `<C-p>`     | Toggle parameter hints     |
| `<C-Space>` | Toggle completion          |

*Parameter hints will be displayed only if no suggestion widget is visible (to avoid conflict with suggestions selection), they can also be triggered using the default vscode keybinding, `ctrl+shift+space` / `cmd+shift+space`

## Clipboard

| Key          | Description                     |
| ------------ | ------------------------------- |
| `<leader>y`  | Copy into system clipboard      |
| `<leader>yy` | Copy line into system clipboard |
| `<leader>Y`  | Copy line into system clipboard |
| `<leader>p`  | Paste from system clipboard     |
| `<leader>d`  | Delete into void register       |
| `<leader>dd` | Delete line into void register  |

*In both visual and normal mode*

## Text manipulation

*In visual mode*

| Key         | Description                            |
| ----------- | -------------------------------------- |
| `<leader>p` | Paste without overwriting the register |
| `>`         | indents while preserving selection     |
| `<`         | dedents while preserving selection     |
| `K`         | Move current line up                   |
| `J`         | Move current line down                 |

## Customizing keybindings

### Vim mappings in settings.json

Add mappings to the `vimEnhanced.*` arrays in **Preferences: Open User Settings (JSON)**. These are merged with this extension's defaults, so unrelated defaults remain available. Changes apply automatically.

Each of the three modes supports recursive and non-recursive mappings:

| Mode | Recursive | Non-recursive |
| ---- | --------- | ------------- |
| Normal | `vimEnhanced.normalModeKeyBindings` | `vimEnhanced.normalModeKeyBindingsNonRecursive` |
| Visual | `vimEnhanced.visualModeKeyBindings` | `vimEnhanced.visualModeKeyBindingsNonRecursive` |
| Insert | `vimEnhanced.insertModeKeyBindings` | `vimEnhanced.insertModeKeyBindingsNonRecursive` |

For example, restore native `x`, change `<leader>f` to format the selection, and use `jj` to leave insert mode:

```json
{
  "vimEnhanced.normalModeKeyBindingsNonRecursive": [
    { "before": ["x"], "after": ["x"] },
    {
      "before": ["<leader>", "f"],
      "commands": ["editor.action.formatSelection"]
    }
  ],
  "vimEnhanced.insertModeKeyBindingsNonRecursive": [
    { "before": ["j", "j"], "after": ["<Esc>"] }
  ]
}
```

Recursive mappings allow keys in `after` to trigger other mappings. Non-recursive mappings execute their keys without triggering further mappings. For example, these recursive mappings make `<leader>q` run the mapping for `<leader>f`:

```json
{
  "vimEnhanced.normalModeKeyBindings": [
    { "before": ["<leader>", "q"], "after": ["<leader>", "f"] }
  ]
}
```

Mappings accept `before`, `after`, `commands`, and `silent`, using [VSCodeVim's mapping format](https://github.com/VSCodeVim/Vim#key-remapping). Commands can be strings or objects such as `{ "command": "example.command", "args": ["value"] }`. These arrays do not evaluate `when` conditions; use `keybindings.json` for contextual VS Code shortcuts.

Custom mappings replace defaults with the identical `before` token sequence, even across recursive and non-recursive arrays. The last duplicate within an array wins. If both custom arrays contain the same sequence, the recursive mapping wins. Equivalent spellings, such as `<leader>` and a literal space, are not deduplicated by this extension; use consistent notation.

To consume a mapping without an action, use `"after": []`. To restore a native Vim action, map the sequence to itself in a **non-recursive** array. Remove a custom mapping to restore its extension default; setting the custom arrays to `[]` restores all defaults for that mode.

#### Existing mappings and generated settings

The runtime writes merged mappings into VSCodeVim's six `vim.*ModeKeyBindings` / `vim.*ModeKeyBindingsNonRecursive` user settings. Edit `vimEnhanced.*` as the inputs. Settings apply to the current VS Code profile; workspace-specific mappings are not supported.

If a mode already has explicit `vim.*` mapping arrays, the extension leaves that entire mode unchanged and shows a migration warning:

1. Move your custom mappings to the matching `vimEnhanced.*` arrays. Merge them with any custom mappings already there.
2. Remove both explicit `vim.*` mapping arrays for that mode from User Settings (JSON).
3. The runtime then generates the merged arrays automatically.

If you manually edit a generated array, that mode is also left untouched until you migrate it. When migrating generated settings, move only the mappings you want to customize; copying defaults into the custom arrays turns them into explicit overrides.

When a mode has no custom mappings, the runtime removes its generated overrides and the extension's manifest defaults take effect again. Disabling or uninstalling the extension does not remove generated user settings: remove the six normal, visual, and insert `vim.*ModeKeyBindings` / `vim.*ModeKeyBindingsNonRecursive` arrays yourself to clean them up. Other Vim settings and VS Code shortcuts are unaffected by synchronization.

### VS Code shortcuts in keybindings.json

For shortcuts such as `ctrl+h` navigation or Explorer actions, run **Preferences: Open Keyboard Shortcuts**. Find the command and use **Change Keybinding** or **Remove Keybinding**. For entries supplied by this extension, search `@ext:mcaragheorghe.vim-enhanced`.

Alternatively, run **Preferences: Open Keyboard Shortcuts (JSON)**. For example, move the Explorer's `r` rename shortcut to `ctrl+alt+r` by removing the original binding and adding a replacement with the same `when` condition:

```json
[
  {
    "key": "r",
    "command": "-renameFile",
    "when": "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !explorerResourceReadonly && !inputFocus"
  },
  {
    "key": "ctrl+alt+r",
    "command": "renameFile",
    "when": "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !explorerResourceReadonly && !inputFocus"
  }
]
```

Each shortcut entry is independent: the separate `shift+r` rename shortcut remains available. Preserve the original `when` condition when moving a contextual shortcut so it runs in the intended place. See [VS Code's keyboard shortcut documentation](https://code.visualstudio.com/docs/configure/keybindings) for override and removal rules.

If VSCodeVim captures a control key that you want VS Code to handle, add it to `vim.handleKeys` in `settings.json`:

```json
{
  "vim.handleKeys": {
    "<C-p>": false
  }
}
```

This delegates the key to VS Code and bypasses Vim mappings for that key. Then configure its action in `keybindings.json`. Other `vim.handleKeys` defaults remain in effect.

## Development

Run `npm ci`, then `npm test` to compile the TypeScript runtime and run the tests. Press F5 to compile and launch an Extension Development Host with the extension loaded. Packaging runs compilation automatically through `vscode:prepublish`.
