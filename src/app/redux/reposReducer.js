import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRepos = createAsyncThunk(
  "repos/fetchRepos",
  async (username) => {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    console.log(response.data);

    response.data.shift()

    return response.data;
  }
);

export const reposSlice = createSlice({
  name: "repos",
  initialState: {
    repoList: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addRepos: {
      reducer: (state, action) => {
        state.repoList = action.payload;
      },
    },
  },
  extraReducers: {
    [fetchRepos.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchRepos.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.repoList = action.payload;
    },
    [fetchRepos.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { addRepos } = reposSlice.actions;

export default reposSlice.reducer;
