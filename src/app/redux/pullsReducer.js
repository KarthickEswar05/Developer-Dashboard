import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPulls = createAsyncThunk(
  "fetchPulls",
  async (props) => {
    console.log(props.reponame)
    const response = await axios.get(
      `https://api.github.com/repos/${props.username}/${props.reponame}/pulls`
    );
    console.log(response.data);

    return response.data;
  }
);

export const pullsSlice = createSlice({
  name: "pulls",
  initialState: {
    pullList: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addPull: {
      reducer: (state, action) => {
        state.pullList = action.payload;
      },
    },
  },
  extraReducers: {
    [fetchPulls.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchPulls.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.pullList = action.payload;
    },
    [fetchPulls.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { addPull } = pullsSlice.actions;

export default pullsSlice.reducer;
