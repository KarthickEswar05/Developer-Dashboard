import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  repoName: "",
  gitName: "",
};

export const repoInfoSlice = createSlice({
  name: "repoInfo",
  initialState,
  reducers: {
    updateRepoName: (state, action) => {
      state.repoName = action.payload;
    },
    updateGitName: (state, action) => {
      state.gitName = action.payload;
    },
  },
});

export const { updateRepoName, updateGitName } = repoInfoSlice.actions;

export default repoInfoSlice.reducer;
