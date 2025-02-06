import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { IUserList } from "../../interfaces";
import { userService } from "../../services";

const initialState: IUserList = {
  results: [],
  info: {
    page: 1,
  },
};

const getAll = createAsyncThunk<IUserList, { results: string; seed: number }>(
  "userListSlice/getAll",
  async ({ results, seed }, { rejectWithValue }) => {
    try {
      const { data } = await userService.getAll(results, seed);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const userListSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addMatcher(isFulfilled(getAll), (state, action) => {
      state.results = action.payload.results;
    }),
});

const { reducer: userListReducer, actions } = userListSlice;

const userListActions = {
  ...actions,
  getAll,
};

export { userListActions, userListReducer };
