import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDeploys = createAsyncThunk(
  "fetchDeploys",
  async (props) => {
    console.log(props.reponame)
    const response = await axios.get(
      `https://api.github.com/repos/${props.username}/${props.reponame}/deployments`

    );
    console.log(response.data,"deploys");

    let resp = response.data && response.data.length>10 ? response.data.slice(0,5) : response.data

    return resp;
  }
);
export const deploysSlice = createSlice({
  name: "deploys",
  initialState: {
    deployList: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addDeploy: {
      reducer: (state, action) => {
        state.deployList = action.payload;
      },
    }
  },
  extraReducers: {
    [fetchDeploys.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchDeploys.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.deployList = action.payload;
    },
    [fetchDeploys.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { addDeploy } = deploysSlice.actions;

export default deploysSlice.reducer;
