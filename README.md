# Vim Enhanced

Keymaps for [Vim extension](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim) to provide a more native Vim experience in VS Code. Inspired by Neovim configurations.

## Installation

Install via [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=mcaragheorghe.vim-enhanced)

## Configuration defaults

The default leader key is `Space`.
Relative lines are enabled by default.

```json
{
  "vim.leader": "space",
  "editor.lineNumbers": "relative",
  "editor.cursorSurroundingLines": 10,
  "vim.replaceWithRegister": true,
  "vim.highlightedyank.enable": true,
  "vim.highlightedyank.color": "#a9dc7660",
  "vim.useCtrlKeys": true,
  "vim.easymotion": true,
  "vim.incsearch": true,
  "vim.hlsearch": true,
  "vim.sneak": true,
  "vim.handleKeys": {
    "<C-space>": false,
    "<C-e>": false,
    "<C-h>": false,
    "<C-j>": false,
    "<C-k>": false,
    "<C-l>": false,
    "<C-y>": false,
    "<C-s>": false,
    "<C-w>": false,
    "<C-d>": true
  },
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
Additionaly, use `tab` and `shift+tab` to move between editor tabs.

| Key       | Description             |
| --------- | ----------------------- |
| `<C-p>`   | Go to file              |
| `<C-h>`   | Move focus left         |
| `<C-j>`   | Move focus down         |
| `<C-k>`   | Move focus up           |
| `<C-l>`   | Move focus right        |
| `tab`     | Cycle next editor       |
| `<S-tab>` | Cycle previous editor   |
| `<C-w>o`  | Maximize focused editor |
| `]d`      | Go to next diagnostic   |
| `[d`      | Go to prev diagnostic   |

Additionally, `ctrl+d`, `ctrl+u`, `n` and `N`(when searching) will also center the screen on jumps.

### File Explorer and File Navigation

| Key          | Description           |
| ------------ | --------------------- |
| `<leader>ge` | Open explorer         |
| `h`          | Collapse directory    |
| `l`          | Expand directory      |
| `j`          | Move down             |
| `k`          | Move up               |
| `a`          | Add new file          |
| `<S-a>`      | Add new directory     |
| `d`          | Delete file           |
| `x`          | Cut file              |
| `y`          | Copy file             |
| `p`          | Paste file            |
| `r`          | Rename file           |
| `v`          | Open file to the side |

## LSP

| Key         | Description             |
| ----------- | ----------------------- |
| `K`         | Hover information       |
| `g.`        | Quick fix               |
| `gd`        | Go to definition        |
| `gpd`       | Go peek definition      |
| `gI`        | Go to implementation    |
| `gpI`       | Go peek implementation  |
| `gr`        | Go to reference         |
| `gD`        | Go to declaration       |
| `gt`        | Go to type definition   |
| `gpt`       | Go peek type definition |
| `<leader>r` | Rename                  |
| `<leader>f` | Format                  |

## Editor Commands

| Key          | Description       |
| ------------ | ----------------- |
| `<leader>e`  | Hide/show sidebar |
| `<leader>ge` | Open explorer     |
| `<leader>/` | Find in files     |
| `<leader>zz` | Zen Mode          |

## Suggestions

| Key     | Description                |
| ------- | -------------------------- |
| `<C-n>` | Select next suggestion     |
| `<C-p>` | Select prev suggestion     |
| `<C-y>` | Accept selected suggestion |

## Clipboard

| Key         | Description                 |
| ----------- | --------------------------- |
| `<leader>y` | Copy into system clipboard  |
| `<leader>p` | Paste from system clipboard |
