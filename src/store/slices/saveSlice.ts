import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { IUser } from "../../interfaces";

interface IState {
  savedUsers: IUser[];
}

const initialState: IState = {
  savedUsers: JSON.parse(localStorage.getItem("savedUsers")) || "[]",
};

const saveUser = createAsyncThunk<IState, { user: IUser }>(
  "saveSlice/saveUser",
  async ({ user }, { rejectWithValue }) => {
    try {
      const existingUsers = JSON.parse(
        localStorage.getItem("savedUsers") || "[]",
      );
      if (!Array.isArray(existingUsers))
        throw new Error("Invalid data in localStorage");

      const userExists = existingUsers.some(
        (existingUser: IUser) => existingUser.login.uuid === user.login.uuid,
      );
      if (userExists) {
        return { savedUsers: existingUsers }; // Return current state without modification
      }

      const updatedUsers = [...existingUsers, user];
      localStorage.setItem("savedUsers", JSON.stringify(updatedUsers));
      return { savedUsers: updatedUsers };
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const deleteUser = createAsyncThunk<IState, { userId: string }>(
  "saveSlice/deleteUser",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const existingUsers = JSON.parse(
        localStorage.getItem("savedUsers") || "[]",
      );
      if (!Array.isArray(existingUsers))
        throw new Error("Invalid data in localStorage");

      const updatedUsers = existingUsers.filter(
        (user: IUser) => user.login.uuid !== userId,
      );
      localStorage.setItem("savedUsers", JSON.stringify(updatedUsers));
      return { savedUsers: updatedUsers };
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const saveSlice = createSlice({
  name: "saveSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(saveUser.fulfilled, (state, action) => {
        state.savedUsers = action.payload.savedUsers;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.savedUsers = action.payload.savedUsers;
      }),
});

const { reducer: saveReducer, actions } = saveSlice;

const saveActions = {
  ...actions,
  saveUser,
  deleteUser,
};

export { saveReducer, saveActions };
