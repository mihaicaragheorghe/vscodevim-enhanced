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
  "vim.showcmd": true,
  "vim.showmodename": true,
  "editor.lineNumbers": "relative",
  "editor.cursorSurroundingLines": 10,
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

| Key                    | Description              |
| ---------------------- | ------------------------ |
| `<leader>sf` / `<C-p>` | Go to file               |
| `<leader>ss`           | Go to symbol             |
| `<leader>/`            | Search in files          |
| `<C-h>`                | Move focus left          |
| `<C-j>`                | Move focus down          |
| `<C-k>`                | Move focus up            |
| `<C-l>`                | Move focus right         |
| `tab`                  | Cycle next editor        |
| `<S-tab>`              | Cycle previous editor    |
| `<C-w>o`               | Maximize focused editor  |
| `]d`                   | Go to next diagnostic    |
| `[d`                   | Go to prev diagnostic    |
| `<leader>ge`           | Open file explorer       |
| `<leader>gs`           | Open source control menu |
| `<leader>gd`           | Open debug menu          |
| ``<C-`>``              | Open terminal            |

Additionally, `ctrl+d`, `ctrl+u`, `n` and `N`(when searching) will also center the screen on jumps.

## Editor Commands

| Key                | Description          |
| ------------------ | -------------------- |
| `<leader><leader>` | Show command palette |
| `<leader>e`        | Hide/show sidebar    |
| `<leader>zz`       | Zen Mode             |
| `<leader>w`        | Save file            |

### File Explorer and File Navigation

| Key          | Description              |
| ------------ | ------------------------ |
| `<leader>ge` | Open explorer            |
| `h`          | Collapse directory       |
| `l`          | Expand directory         |
| `j`          | Move down                |
| `k`          | Move up                  |
| `a` / `%`    | Add new file             |
| `A` / `d`    | Add new directory        |
| `r` / `R`    | Rename file              |
| `D`          | Delete file  / directory |
| `x`          | Cut file                 |
| `y`          | Copy file                |
| `p`          | Paste file               |
| `v`          | Open file to the side    |

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

| Key     | Description                |
| ------- | -------------------------- |
| `<C-n>` | Select next suggestion     |
| `<C-p>` | Select prev suggestion     |
| `<C-y>` | Accept selected suggestion |
| `<C-p>` | Toggle parameter hints     |

*Parameter hints will be displayed only if no suggestion widget is visible (to avoid conflict with suggestions selection)*

## Clipboard

| Key          | Description                    |
| ------------ | ------------------------------ |
| `<leader>y`  | Copy into system clipboard     |
| `<leader>p`  | Paste from system clipboard    |
| `<leader>d`  | Delete into void register      |
| `<leader>dd` | Delete line into void register |

## Text manipulation

*In visual mode*

| Key | Description            |
| --- | ---------------------- |
| `K` | Move current line up   |
| `J` | Move current line down |
