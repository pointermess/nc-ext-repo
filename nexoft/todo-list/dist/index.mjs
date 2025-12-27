function activate(context) {
  console.log("[Todo List] Extension activated!");
  const addTodoCommand = nexcode.commands.register("todo-list.addTodo", () => {
    nexcode.window.showMessage("Use the Todo List panel to add todos", "info");
  });
  const clearCompletedCommand = nexcode.commands.register("todo-list.clearCompleted", () => {
    window.dispatchEvent(new CustomEvent("todo-list:clearCompleted"));
    nexcode.window.showMessage("Cleared completed todos", "info");
  });
  context.subscriptions.push(addTodoCommand);
  context.subscriptions.push(clearCompletedCommand);
  const showCompleted = nexcode.settings.get("todo-list.showCompleted", true);
  console.log("[Todo List] Show completed setting:", showCompleted);
}
function deactivate() {
  console.log("[Todo List] Extension deactivated!");
}
export {
  activate,
  deactivate
};
//# sourceMappingURL=index.mjs.map
