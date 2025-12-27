import { defineComponent, ref, computed, onMounted, createElementBlock, openBlock, createElementVNode, createCommentVNode, createTextVNode, normalizeClass, toDisplayString, withDirectives, withKeys, vModelText, Fragment, renderList } from "vue";
const _hoisted_1 = { class: "flex flex-col h-full p-3 font-sans text-[var(--color-text-primary)]" };
const _hoisted_2 = { class: "mb-4" };
const _hoisted_3 = { class: "flex gap-3 text-xs" };
const _hoisted_4 = { class: "flex gap-2 mb-3" };
const _hoisted_5 = ["disabled"];
const _hoisted_6 = { class: "flex gap-1 p-1 mb-3 bg-[var(--color-surface)] rounded-lg" };
const _hoisted_7 = ["onClick"];
const _hoisted_8 = {
  key: 0,
  class: "flex items-center justify-center gap-2 p-8 text-sm text-[var(--color-text-muted)]"
};
const _hoisted_9 = {
  key: 1,
  class: "flex flex-col items-center justify-center p-8 text-center text-[var(--color-text-muted)]"
};
const _hoisted_10 = {
  key: 0,
  class: "text-sm m-0"
};
const _hoisted_11 = {
  key: 1,
  class: "text-sm m-0"
};
const _hoisted_12 = {
  key: 2,
  class: "text-sm m-0"
};
const _hoisted_13 = {
  key: 2,
  class: "flex-1 overflow-y-auto flex flex-col gap-1.5"
};
const _hoisted_14 = ["onClick"];
const _hoisted_15 = { key: 0 };
const _hoisted_16 = ["onClick"];
const _hoisted_17 = {
  key: 3,
  class: "mt-3 pt-3 border-t border-[var(--color-border-muted)]"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TodoPanel",
  setup(__props) {
    const todos = ref([]);
    const newTodoText = ref("");
    const filter = ref("all");
    const isLoading = ref(true);
    function generateId() {
      return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    const filteredTodos = computed(() => {
      switch (filter.value) {
        case "active":
          return todos.value.filter((t) => !t.completed);
        case "completed":
          return todos.value.filter((t) => t.completed);
        default:
          return todos.value;
      }
    });
    const activeTodosCount = computed(
      () => todos.value.filter((t) => !t.completed).length
    );
    const completedTodosCount = computed(
      () => todos.value.filter((t) => t.completed).length
    );
    function addTodo() {
      const text = newTodoText.value.trim();
      if (!text) return;
      todos.value.unshift({
        id: generateId(),
        text,
        completed: false,
        createdAt: Date.now()
      });
      newTodoText.value = "";
      saveTodos();
    }
    function toggleTodo(id) {
      const todo = todos.value.find((t) => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
      }
    }
    function deleteTodo(id) {
      const index = todos.value.findIndex((t) => t.id === id);
      if (index !== -1) {
        todos.value.splice(index, 1);
        saveTodos();
      }
    }
    function clearCompleted() {
      todos.value = todos.value.filter((t) => !t.completed);
      saveTodos();
    }
    function saveTodos() {
      try {
        localStorage.setItem("nexcode.todo-list.todos", JSON.stringify(todos.value));
      } catch (e) {
        console.error("[TodoPanel] Failed to save todos:", e);
      }
    }
    function loadTodos() {
      try {
        const saved = localStorage.getItem("nexcode.todo-list.todos");
        if (saved) {
          todos.value = JSON.parse(saved);
        }
      } catch (e) {
        console.error("[TodoPanel] Failed to load todos:", e);
      }
    }
    onMounted(() => {
      loadTodos();
      isLoading.value = false;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("div", _hoisted_2, [
          _cache[1] || (_cache[1] = createElementVNode("h2", { class: "flex items-center gap-2 mb-2 text-lg font-semibold" }, [
            createElementVNode("span", { class: "text-xl" }, "✅"),
            createTextVNode(" Todo List ")
          ], -1)),
          createElementVNode("div", _hoisted_3, [
            createElementVNode("span", {
              class: normalizeClass(["px-2 py-0.5 rounded-full bg-[var(--color-surface-elevated)]", { "text-blue-400": true }])
            }, toDisplayString(activeTodosCount.value) + " active", 1),
            createElementVNode("span", {
              class: normalizeClass(["px-2 py-0.5 rounded-full bg-[var(--color-surface-elevated)]", { "text-green-400": true }])
            }, toDisplayString(completedTodosCount.value) + " done", 1)
          ])
        ]),
        createElementVNode("div", _hoisted_4, [
          withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => newTodoText.value = $event),
            type: "text",
            placeholder: "What needs to be done?",
            class: "flex-1 px-3 py-2.5 bg-[var(--color-bg-level-2)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 placeholder-[var(--color-text-muted)] transition-all",
            onKeyup: withKeys(addTodo, ["enter"])
          }, null, 544), [
            [vModelText, newTodoText.value]
          ]),
          createElementVNode("button", {
            class: "w-10 h-10 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-violet-500 rounded-lg text-white text-2xl font-light hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all",
            onClick: addTodo,
            disabled: !newTodoText.value.trim()
          }, [..._cache[2] || (_cache[2] = [
            createElementVNode("span", null, "+", -1)
          ])], 8, _hoisted_5)
        ]),
        createElementVNode("div", _hoisted_6, [
          (openBlock(), createElementBlock(Fragment, null, renderList(["all", "active", "completed"], (f) => {
            return createElementVNode("button", {
              key: f,
              class: normalizeClass(["flex-1 py-1.5 px-3 rounded-md text-xs font-medium capitalize transition-all", filter.value === f ? "bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] shadow-sm" : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"]),
              onClick: ($event) => filter.value = f
            }, toDisplayString(f), 11, _hoisted_7);
          }), 64))
        ]),
        isLoading.value ? (openBlock(), createElementBlock("div", _hoisted_8, [..._cache[3] || (_cache[3] = [
          createElementVNode("div", { class: "w-4 h-4 border-2 border-[var(--color-border-muted)] border-t-indigo-500 rounded-full animate-spin" }, null, -1),
          createTextVNode(" Loading todos... ", -1)
        ])])) : filteredTodos.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_9, [
          _cache[4] || (_cache[4] = createElementVNode("span", { class: "text-4xl mb-2 opacity-50" }, "📝", -1)),
          filter.value === "all" ? (openBlock(), createElementBlock("p", _hoisted_10, "No todos yet. Add one above!")) : filter.value === "active" ? (openBlock(), createElementBlock("p", _hoisted_11, "No active todos. Great job!")) : (openBlock(), createElementBlock("p", _hoisted_12, "No completed todos yet."))
        ])) : (openBlock(), createElementBlock("div", _hoisted_13, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(filteredTodos.value, (todo) => {
            return openBlock(), createElementBlock("div", {
              key: todo.id,
              class: normalizeClass(["group flex items-center gap-2.5 p-2.5 bg-[var(--color-surface)] border border-[var(--color-border-muted)] rounded-lg hover:border-[var(--color-border)] transition-all", { "opacity-60": todo.completed }])
            }, [
              createElementVNode("button", {
                class: normalizeClass(["w-5 h-5 flex items-center justify-center bg-transparent border-2 border-[var(--color-border-muted)] rounded-md text-white text-xs cursor-pointer hover:border-indigo-500 transition-all shrink-0", { "bg-gradient-to-br from-indigo-500 to-violet-500 border-transparent": todo.completed }]),
                onClick: ($event) => toggleTodo(todo.id)
              }, [
                todo.completed ? (openBlock(), createElementBlock("span", _hoisted_15, "✓")) : createCommentVNode("", true)
              ], 10, _hoisted_14),
              createElementVNode("span", {
                class: normalizeClass(["flex-1 text-sm break-all", { "line-through text-[var(--color-text-muted)]": todo.completed }])
              }, toDisplayString(todo.text), 3),
              createElementVNode("button", {
                class: "w-6 h-6 flex items-center justify-center bg-transparent border-none rounded-md text-[var(--color-text-muted)] text-xl cursor-pointer opacity-0 group-hover:opacity-100 hover:bg-red-500/20 hover:text-red-500 transition-all shrink-0",
                onClick: ($event) => deleteTodo(todo.id)
              }, " × ", 8, _hoisted_16)
            ], 2);
          }), 128))
        ])),
        completedTodosCount.value > 0 ? (openBlock(), createElementBlock("div", _hoisted_17, [
          createElementVNode("button", {
            class: "w-full py-2 px-3 bg-transparent border border-[var(--color-border-muted)] rounded-md text-[var(--color-text-muted)] text-xs hover:bg-red-500/10 hover:border-red-500 hover:text-red-500 transition-all",
            onClick: clearCompleted
          }, " Clear " + toDisplayString(completedTodosCount.value) + " completed ", 1)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=TodoPanel.mjs.map
