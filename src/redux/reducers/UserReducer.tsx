import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserLoginModel } from "../../Pages/Login/Login";
import { history } from "../../index";
import axios from "axios";
import {
  ACCESS_TOKEN,
  //   //   getStore,
  //   getStoreJson,
  saveStore,
  saveStoreJson,
  getStoreJson,
  USER_LOGIN,
  TOKEN_CYBERSOFT,
  getStore,
} from "../../util/config";

import { DispatchType } from "../configStore";
import userEvent from "@testing-library/user-event";
import { getProjectDetailAPI } from "./ProjectReducer";
export interface UserLoginResult {
  id: number;
  email: string;
  avatar: string;
  phoneNumber: string;
  name: string;
  accessToken: string;
}
export interface USER {
  userId: number;
  name: string;
  avatar: string;
  email: string;
  phoneNumber: string;
}
export interface AddUser {
  projectId: number;
  userId: number;
}
export interface UserState {
  userLogin: UserLoginResult;
  user: USER[];
  addUser: AddUser;
}
const initialState = {
  userLogin: getStoreJson(USER_LOGIN) ? getStoreJson(USER_LOGIN) : null,
  user: [],
};

const UserReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    loginAction: (state: UserState, action: PayloadAction<UserLoginResult>) => {
      state.userLogin = action.payload;
    },
    getUserAction: (state: UserState, action: PayloadAction<USER[]>) => {
      state.user = action.payload;
    },
  },
});

export const { loginAction, getUserAction } = UserReducer.actions;

export default UserReducer.reducer;

export const loginAsyncApi = (userLogin: UserLoginModel) => {
  return async (dispatch: DispatchType) => {
    const result = await axios({
      url: "https://jiranew.cybersoft.edu.vn/api/Users/signin",
      method: "POST",
      data: userLogin,
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
    console.log("obDangNhap", result.data.content);
    //Cập nhật cho reducer
    const action = loginAction(result.data.content);
    dispatch(action);
    //Lưu localstorage
    saveStoreJson(USER_LOGIN, result.data.content);
    saveStore(ACCESS_TOKEN, result.data.content.accessToken);
    history.push("/home");
  };
};
export const getUserApi = (keyword: string) => {
  return async (dispatch: DispatchType) => {
    const result = await axios({
      url: `https://jiranew.cybersoft.edu.vn/api/Users/getUser?keyword=${keyword}`,
      method: "get",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: `Bearer ${getStore(ACCESS_TOKEN)}`,
      },
    });
    const action = getUserAction(result.data.content);
    dispatch(action);
    console.log(result.data.content);
  };
};
export const addUserApi = (addUser: AddUser) => {
  return async (dispatch: DispatchType) => {
    const result = await axios({
      url: `https://jiranew.cybersoft.edu.vn/api/Project/assignUserProject`,
      method: "post",
      data: addUser,
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: `Bearer ${getStore(ACCESS_TOKEN)}`,
      },
    });
    dispatch(getProjectDetailAPI());
    console.log(result.data.content);
  };
};
