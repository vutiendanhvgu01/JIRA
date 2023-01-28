import React from "react";
import ReactDOM from "react-dom/client";
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { UserLoginTemplate } from "./HomeTemplate/UserLoginTemplate";
import Login from "./Pages/Login/Login";
import HomeTemplate from "./HomeTemplate/HomeTemplate";
import "antd/dist/antd";

import { store } from "./redux/configStore";
import { Provider } from "react-redux";

import CreateTask from "./Pages/Task/CreateTask";
import Profile from "./Pages/User/Profile";
import CreateProject from "./Pages/CreateProject/CreateProject";
import ProjectManagement from "./Pages/ProjectManagement/ProjectManagement";
import MODALCYBERBUG from "./HOC/CyberBugHOC/MODALCYBERBUG";
import EditProjectForm from "./Component/Form/EditProjectForm/EditProjectForm";
import ProjectDetail from "./Pages/Detail/ProjectDetail";
import Register from "./Pages/Register/Register";
import UserManagement from "./Pages/User/UserManagement";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
export const history: any = createBrowserHistory();
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <MODALCYBERBUG />
      <Routes>
        <Route index element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="home" element={<HomeTemplate />}>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="createProject" element={<CreateProject />}></Route>
          <Route
            path="projectManagement"
            element={<ProjectManagement />}
          ></Route>
          <Route path="userManagement" element={<UserManagement />}></Route>
          {/* <Route path="drawer" element={<MODALCYBERBUG />}></Route> */}
          <Route path="projectdetail">
            <Route path=":id" element={<ProjectDetail />}></Route>
          </Route>
          <Route path="createTask" element={<CreateTask />}></Route>
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);
