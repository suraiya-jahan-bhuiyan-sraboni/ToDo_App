import { createSlice, createSelector, nanoid } from '@reduxjs/toolkit'

const initialState = {
  todos: [],
  filter: "all",
}

export const taskSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.todos.unshift(action.payload);
      },
      prepare({ title, description = "", date = null }) {
        return {
          payload: {
            id: nanoid(),
            title,
            description,
            date,
            completed: false,
            createdAt: Date.now(),
          },
        };
      },
    },

    toggleTodo(state, action) {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },


    editTodo(state, action) {
      const { id, title, description, date } = action.payload;
      const todo = state.todos.find((t) => t.id === id);
      if (todo) {
        if (title !== undefined) todo.title = title;
        if (description !== undefined) todo.description = description;
        if (date !== undefined) todo.date = date;
      }
    },

    deleteTodo(state, action) {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },

    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const selectTodosState = (state) => state.todos;

export const selectAllTodos = createSelector(
  selectTodosState,
  (todosState) => todosState.todos
);

export const selectFilter = createSelector(
  selectTodosState,
  (todosState) => todosState.filter
);

export const selectFilteredTodos = createSelector(
  [selectAllTodos, selectFilter],
  (todos, filter) => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }
);

export const selectStats = createSelector(selectAllTodos, (todos) => ({
  total: todos.length,
  completed: todos.filter((t) => t.completed).length,
  remaining: todos.filter((t) => !t.completed).length,
}));

export const {
  addTodo,
  toggleTodo,
  editTodo,
  deleteTodo,
  setFilter,
} = taskSlice.actions;

export default taskSlice.reducer;