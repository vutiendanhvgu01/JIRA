import { configureStore } from "@reduxjs/toolkit";
import { drawerReducer } from "./reducers/DrawerCyberBug";

import ProjectReducer from "./reducers/ProjectReducer";
import UserReducer from "./reducers/UserReducer";
export const store = configureStore({
  reducer: {
    UserReducer: UserReducer,
    ProjectReducer: ProjectReducer,
    drawerReducer: drawerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
