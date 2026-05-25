import { configureStore } from "@reduxjs/toolkit";
import reposReducer from "./reposReducer";
import pullsReducer from "./pullsReducer";
import deploysReducer from "./deploysReducer";
import repoInfoReducer from "./repoInfoReducer";

export const store = configureStore({
  reducer: { repos: reposReducer, repoInfo: repoInfoReducer, pullList: pullsReducer,deployList: deploysReducer},
});
