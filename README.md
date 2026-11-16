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

Run **Preferences: Open User Settings (JSON)** and add individual overrides to `vim.normalModeKeyBindings`, `vim.visualModeKeyBindings`, or `vim.insertModeKeyBindings`. These mappings take priority over this extension's nonrecursive defaults, so other supplied mappings remain available. Merge examples into your existing settings and mapping arrays.

For example, change normal-mode `<leader>f` to format only the selection, visual-mode `<leader>y` to use VS Code's copy command, and insert-mode `<C-p>` to trigger suggestions:

```json
{
  "vim.normalModeKeyBindings": [
    {
      "before": ["<leader>", "f"],
      "commands": ["editor.action.formatSelection"]
    }
  ],
  "vim.visualModeKeyBindings": [
    {
      "before": ["<leader>", "y"],
      "commands": ["editor.action.clipboardCopyAction"]
    }
  ],
  "vim.insertModeKeyBindings": [
    {
      "before": ["<C-p>"],
      "commands": ["editor.action.triggerSuggest"]
    }
  ]
}
```

To disable a mapping, use an empty `after` array. To restore a native Vim action such as `x` (which this extension sends to the black-hole register), map the key to itself. This example also moves formatting from `<leader>f` to `<leader>F`:

```json
{
  "vim.normalModeKeyBindings": [
    {
      "before": ["<leader>", "f"],
      "after": []
    },
    {
      "before": ["<leader>", "F"],
      "commands": ["editor.action.formatDocument"]
    },
    {
      "before": ["x"],
      "after": ["x"]
    }
  ]
}
```

An empty `after` consumes the mapping without running an action; it does not restore the key's native action. Remove an override to restore this extension's default. Overrides apply only to the specified mode and key sequence.

These user mapping arrays are recursive: keys in `after` can trigger other mappings. VSCodeVim handles the same-key `x` example by executing its first key without remapping it again. See [VSCodeVim's remapping documentation](https://github.com/VSCodeVim/Vim#key-remapping) for more details.

This extension stores its defaults in the three `vim.*ModeKeyBindingsNonRecursive` arrays. Setting one of those arrays yourself replaces that mode's entire nonrecursive defaults array, even if you set it to `[]`. Use the arrays shown above to preserve unrelated defaults.

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
