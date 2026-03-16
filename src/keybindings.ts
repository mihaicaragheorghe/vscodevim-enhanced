export const vim = {
  normalModeKeyBindingsNonRecursive: [
    {
      before: ["<C-p>"],
      commands: ["workbench.action.quickOpen"],
      when: "!suggestWidgetVisible && editorHasSignatureHelpProvider && editorTextFocus"
    },
    {
      before: ["<leader>", "e"],
      commands: ["workbench.action.toggleSidebarVisibility"]
    },
    {
      before: ["tab"],
      commands: ["workbench.action.nextEditor"],
      when: "editorTextFocus"
    },
    {
      before: ["shift+tab"],
      commands: ["workbench.action.previousEditor"],
      when: "editorTextFocus"
    },
    {
      before: ["<leader>", "g", "e"],
      commands: ["workbench.view.explorer"]
    },
    {
      before: ["<leader>", "f"],
      commands: ["editor.action.formatDocument"]
    },
    {
      before: ["<leader>", "z", "z"],
      commands: ["workbench.action.toggleZenMode"]
    },
    {
      before: ["<leader>", "r"],
      commands: ["editor.action.rename"]
    },
    {
      before: ["<Esc>"],
      commands: [":nohl"]
    },
    {
      before: ["<C-d>"],
      after: ["<C-d>", "z", "z"]
    },
    {
      before: ["<C-u>"],
      after: ["<C-u>", "z", "z"]
    },
    {
      before: ["n"],
      after: ["n", "z", "z"]
    },
    {
      before: ["N"],
      after: ["N", "z", "z"]
    },
    {
      before: ["<leader>", "d"],
      after: ["\"", "_", "d"]
    },
    {
      before: ["x"],
      after: ["\"", "_", "x"]
    },
    {
      before: ["<leader>", "y"],
      after: ["\"", "+", "y"]
    },
    {
      before: ["<leader>", "y", "y"],
      after: ["\"", "+", "y", "y"]
    },
    {
      before: ["<leader>", "Y"],
      after: ["\"", "+", "Y"]
    },
    {
      before: ["<leader>", "p"],
      after: ["\"", "+", "p"]
    },
    {
      before: ["K"],
      commands: ["editor.action.showDefinitionPreviewHover"]
    },
    {
      before: ["<leader>", "c", "a"],
      commands: ["editor.action.quickFix"],
      when: "editorHasCodeActionsProvider && textInputFocus && !editorReadonly"
    },
    {
      before: ["<C-.>"],
      commands: ["editor.action.quickFix"],
      when: "editorHasCodeActionsProvider && textInputFocus && !editorReadonly"
    },
    {
      before: ["g", "d"],
      commands: ["editor.action.revealDefinition"]
    },
    {
      before: ["g", "p", "d"],
      commands: ["editor.action.peekDefinition"]
    },
    {
      before: ["g", "I"],
      commands: ["editor.action.goToImplementation"]
    },
    {
      before: ["g", "p", "I"],
      commands: ["editor.action.peekImplementation"]
    },
    {
      before: ["g", "D"],
      commands: ["editor.action.revealDeclaration"]
    },
    {
      before: ["g", "r"],
      commands: ["editor.action.referenceSearch.trigger"]
    },
    {
      before: ["g", "t"],
      commands: ["editor.action.goToTypeDefinition"]
    },
    {
      before: ["g", "p", "t"],
      commands: ["editor.action.peekTypeDefinition"]
    },
    {
      before: ["]", "d"],
      commands: ["editor.action.marker.next"],
      when: "editorFocus"
    },
    {
      before: ["[", "d"],
      commands: ["editor.action.marker.prev"],
      when: "editorFocus"
    },
    {
      before: ["<leader>", "w"],
      commands: ["workbench.action.files.save"],
      when: "editorFocus"
    },
    {
      before: ["<leader>", "<leader>"],
      commands: ["workbench.action.showCommands"]
    },
    {
      before: ["<leader>", "s", "f"],
      commands: ["workbench.action.quickOpen"]
    },
    {
      before: ["<leader>", "s", "s"],
      commands: ["workbench.action.gotoSymbol"],
      when: "!accessibilityHelpIsShown && !accessibleViewIsShown"
    },
    {
      before: ["<leader>", "/"],
      commands: ["workbench.action.findInFiles"]
    },
    {
      before: ["<leader>", "g", "d"],
      commands: ["workbench.view.debug"],
      when: "viewContainer.workbench.view.debug.enabled"
    },
    {
      before: ["<leader>", "g", "s"],
      commands: ["workbench.view.scm"],
      when: "workbench.scm.active"
    },
    {
      before: ["<C-`>"],
      commands: ["workbench.action.terminal.toggleTerminal"],
      when: "terminal.active"
    }
  ],
  visualModeKeyBindings: [
    {
      before: ["<leader>", "y"],
      after: ["\"", "+", "y"]
    },
    {
      before: ["<leader>", "d"],
      after: ["\"", "_", "d"]
    },
    {
      before: ["<leader>", "p"],
      after: ["\"", "_", "d", "P"]
    },
    {
      before: ["J"],
      after: [":", "m", " ", "'", ">", "+", "1", "<CR>", "V"]
    },
    {
      before: ["K"],
      after: [":", "m", " ", "'", ">", "-", "2", "<CR>", "V"]
    },
    {
      before: ["<"],
      after: ["<", "g", "v", "^"]
    },
    {
      before: [">"],
      after: [">", "g", "v", "^"]
    }
  ],
  insertModeKeyBindings: [
    {
      before: ["<C-p>"],
      commands: ["editor.action.triggerParameterHints"],
      when: "editorHasSignatureHelpProvider && editorTextFocus"
    }
  ],
};
