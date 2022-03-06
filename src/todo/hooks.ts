import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { RootState } from "../store";
import { User } from "../user/types";
import { addTodo, removeTodo, toggleTodo } from "./reducer";
import { Todo, TodoStatus } from "./types";

export function useTodos(): Todo[] {
  return useSelector((state: RootState) => state.todo.todos);
}

export function useTodosAssignedTo(assignee: User): Todo[] {
  return useSelector((state: RootState) =>
    state.todo.todos.filter((todo) => todo.assigneeId === assignee.id)
  );
}

export function useTodoStatus(): TodoStatus {
  return useSelector((state: RootState) => ({
    totalCount: state.todo.todos.length,
    doneCount: state.todo.todos.filter((todo) => todo.done).length,
  }));
}

export function useAddTodo(): (title: string, assignee: User) => Todo {
  const dispatch = useDispatch();
  return useCallback((title: string, assignee: User) => {
    const todo = { id: uuid(), title, assigneeId: assignee.id, done: false };
    dispatch(addTodo(todo));
    return todo;
  }, []);
}

export function useRemoveTodo(): (id: string) => void {
  const dispatch = useDispatch();
  return useCallback((id: string) => {
    dispatch(removeTodo(id));
  }, []);
}

export function useToggleTodo(): (id: string) => void {
  const dispatch = useDispatch();
  return useCallback((id: string) => {
    dispatch(toggleTodo(id));
  }, []);
}

export function useTrackTodoStatus(): (action: string) => void {
  const todoStatus = useTodoStatus();
  return useCallback(
    (action: string) => {
      console.log("Todo Status", action, todoStatus);
    },
    [todoStatus]
  );
}
