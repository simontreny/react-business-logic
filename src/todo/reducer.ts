import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INITIAL_TODOS } from "./consts";
import { Todo } from "./types";

export interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: INITIAL_TODOS,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? {
                ...todo,
                done: !todo.done,
              }
            : todo
        ),
      };
    },
  },
});

export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;
