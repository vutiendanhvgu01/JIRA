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
  http,
} from "../../util/config";

import { DispatchType } from "../configStore";
import { notifiFucntion } from "../../util/notificationCyberBug";
import userEvent from "@testing-library/user-event";
import { getAllProjectAPI } from "./ProjectReducer";
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
export interface UserUpdate {
  id: string;
  passWord: string;
  email: string;
  name: string;
  phoneNumber: string;
}
export interface UserByProjectId {
  userId:      number;
  name:        string;
  avatar:      string;
  email:       string;
  phoneNumber: string;
}
export interface UserState {
  userLogin: UserLoginResult;
  user: USER[];
  addUser: AddUser;
  ModalOpen: boolean;
  userByProjectId: UserByProjectId[]
}

const initialState = {
  userLogin: getStoreJson(USER_LOGIN) ? getStoreJson(USER_LOGIN) : null,
  user: [],
  ModalOpen: false,
  userByProjectId:[]

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
    setModalOpen: (state: UserState, action: PayloadAction<boolean>) => {
      state.ModalOpen = action.payload;
    },
    getUserByProjectIdAction: (state: UserState, action: PayloadAction<UserByProjectId[]>) => {
      state.userByProjectId = action.payload;
    },
  }
}
);

export const { loginAction, getUserAction, setModalOpen,getUserByProjectIdAction } = UserReducer.actions;

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
    dispatch(getAllProjectAPI());
    console.log(result.data.content);
  };
};
export const deleteUserApi = (deleteUser: AddUser) => {
  return async (dispatch: DispatchType) => {
    const result = await axios({
      url: `https://jiranew.cybersoft.edu.vn/api/Project/removeUserFromProject`,
      method: "post",
      data: deleteUser,
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: `Bearer ${getStore(ACCESS_TOKEN)}`,
      },
    });
    dispatch(getAllProjectAPI());
    console.log(result.data.content);
  };
};

export const editUser = (value: UserUpdate) => {
  return async (dispatch: DispatchType) => {
    const result = await http.put("/api/Users/editUser", value);
    console.log(result.data.content);
    const actionCloseModal = setModalOpen(false);
    dispatch(actionCloseModal);
    notifiFucntion("success", "Cập nhật thông tin thành công");
    const userLogin: UserLoginModel = {
      email: value.email,
      passWord: value.passWord,
    };
    const userLoginAction = loginAsyncApi(userLogin);
    dispatch(userLoginAction);
  };
};

export const getUserByProjectIdApi = (id:string) => {
  return async (dispatch:DispatchType) => {
    const result = await http.get(`/api/Users/getUserByProjectId?idProject=${id}`)

    const action = getUserByProjectIdAction(result.data.content)
    dispatch(action)
  }
}
