import React, { KeyboardEvent, useState } from "react";
import {
  useAddTodo,
  useRemoveTodo,
  useTodos,
  useToggleTodo,
} from "./todo/hooks";
import { Todo } from "./todo/types";
import { useAddUser, useRemoveUser, useUser, useUsers } from "./user/hooks";
import { User } from "./user/types";

export const App: React.FC = () => {
  const [assignee, setAssignee] = useState<User | undefined>();

  return (
    <div>
      <h1>Todo List</h1>
      <AssigneeFilterBar assignee={assignee} onSelect={setAssignee} />
      <TodoList assignee={assignee} />
      {assignee && <AddTodoInput assignee={assignee} />}
    </div>
  );
};

const AssigneeFilterBar: React.FC<{
  assignee: User | undefined;
  onSelect: (assignee: User | undefined) => void;
}> = ({ assignee, onSelect }) => {
  const users = useUsers();
  const addUser = useAddUser();
  const removeUser = useRemoveUser();

  const handleAddUser = () => {
    const name = prompt("Name");
    if (name !== null) {
      const user = addUser(name);
      onSelect(user);
    }
  };

  const handleRemoveUser = () => {
    removeUser(assignee!.id);
    onSelect(undefined);
  };

  const handleChange = (value: string) => {
    onSelect(users.find((user) => user.id === value));
  };

  return (
    <div>
      Assignee:{" "}
      <select
        value={assignee?.id ?? "none"}
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value="none">All</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <button onClick={handleAddUser}>Add</button>
      <button disabled={!assignee} onClick={handleRemoveUser}>
        Remove
      </button>
    </div>
  );
};

const TodoList: React.FC<{ assignee: User | undefined }> = ({ assignee }) => {
  const todos = useTodos();
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const user = useUser(todo.assigneeId);
  const toggleTodo = useToggleTodo();
  const removeTodo = useRemoveTodo();

  return (
    <li
      style={{ textDecoration: todo.done ? "line-through" : "none" }}
      onClick={() => toggleTodo(todo.id)}
    >
      {todo.title}
      <span style={{ color: "grey" }}> - assigned to {user?.name}</span>{" "}
      <button onClick={() => removeTodo(todo.id)}>x</button>
    </li>
  );
};

const AddTodoInput: React.FC<{ assignee: User }> = ({ assignee }) => {
  const [title, setTitle] = useState("");
  const addTodo = useAddTodo();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo(title, assignee);
      setTitle("");
    }
  };

  return (
    <div>
      <b>New todo:</b>{" "}
      <input
        placeholder="Buy milk"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
