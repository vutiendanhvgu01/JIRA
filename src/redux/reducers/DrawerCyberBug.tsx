import React from "react";

export const initialState = {
  visible: false,
  ComponentContentDrawer: <p>Default content</p>,
  callBackSubmit: (propsValue: any) => {
    alert("Demo Click!");
  },
};

export const drawerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "OPEN_DRAWER":
      return { ...state, visible: true };
    case "CLOSE_DRAWER":
      return { ...state, visible: false };
    case "OPEN_FORM_EDIT_PROJECT":
      return {
        ...state,
        visible: true,
        ComponentContentDrawer: action.Component,
      };
    case "SET_SUBMIT_EDIT_PROJECT":
      return { ...state, callBackSubmit: action.submitFunction };
    default:
      return state;
  }
};

// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import UpdateProfile from '../../Pages/User/UpdateProfile';
// export interface popUp {
//     visibleState: boolean,

// }
// export interface DrawerState {
//     visible: popUp,
//     compo:JSX.Element
// }

// export const initialState = {
//     visible: false,
//     compo: <UpdateProfile />

// }

// const DrawerCyberBug = createSlice({
//     name: "drawerReducer",
//     initialState,
//     reducers: {
//         openDrawer: (state = initialState, action: PayloadAction<popUp>) => {
//             state.visible = true

//         },
//         CloseDrawer: (state = initialState, action: PayloadAction<popUp>) => {
//             state.visible = false
//         },
//         // changeContent: (state: DrawerState, action: PayloadAction<JSX.Element>) => {
//         //     state.compo = action.payload
//         // }
//     }
// });

// export const { openDrawer, CloseDrawer } = DrawerCyberBug.actions

// export default DrawerCyberBug.reducer
// >>>>>>> 7140dabc2a135a00243f6b5232b5c700e0ae9765
