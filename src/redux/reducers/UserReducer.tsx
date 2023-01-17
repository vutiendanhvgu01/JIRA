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
export interface UserLoginResult {
  id:          number;
  email:       string;
  avatar:      string;
  phoneNumber: string;
  name:        string;
  accessToken: string;
}
export interface UserUpdate {
  id:string;
  passWord:string;
  email:string;
  name:string;
  phoneNumber:string;
}
export interface UserState {
  userLogin: UserLoginResult;
  ModalOpen:boolean;
}
const initialState = {
  userLogin: getStoreJson(USER_LOGIN) ? getStoreJson(USER_LOGIN) : null,
  ModalOpen:false,
};

const UserReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    loginAction: (state: UserState, action: PayloadAction<UserLoginResult>) => {
      state.userLogin = action.payload;
    },
    setModalOpen: (state:UserState,action:PayloadAction<boolean>) => {
      state.ModalOpen = action.payload;
    }
  },
});

export const { loginAction, setModalOpen } = UserReducer.actions;

export default UserReducer.reducer;

export const loginAsyncApi = (userLogin: UserLoginModel) => {
  return async (dispatch:DispatchType) => {
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
    history.push("/home")
  };
};

export const editUser = (value:UserUpdate) => {
  return async (dispatch:DispatchType) => {
    const result = await http.put('/api/Users/editUser',value)
    console.log(result.data.content)
    const actionCloseModal = setModalOpen(false)
    dispatch(actionCloseModal)
    notifiFucntion('success', 'Cập nhật thông tin thành công')
    const userLogin:UserLoginModel = {
      email:value.email,
      passWord:value.passWord
    }
    const userLoginAction = loginAsyncApi(userLogin)
    dispatch(userLoginAction)
  }
}
