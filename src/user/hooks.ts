import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { RootState } from "../store";
import { addUser, removeUser } from "./reducer";
import { User } from "./types";

export function useUsers(): User[] {
  return useSelector((state: RootState) => state.user.users);
}

export function useUser(id: string): User | undefined {
  return useSelector((state: RootState) =>
    state.user.users.find((user) => user.id === id)
  );
}

export function useAddUser(): (name: string) => User {
  const dispatch = useDispatch();
  return useCallback((name: string) => {
    const user = { id: uuid(), name };
    dispatch(addUser(user));
    return user;
  }, []);
}

export function useRemoveUser(): (id: string) => void {
  const dispatch = useDispatch();
  return useCallback((id: string) => {
    dispatch(removeUser(id));
  }, []);
}
