import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INITIAL_USERS } from "./consts";
import { User } from "./types";

export interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: INITIAL_USERS,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<string>) => {
      return {
        users: state.users.filter((user) => user.id !== action.payload),
      };
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
