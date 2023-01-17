import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/configStore";
import UpdateProfile from "./UpdateProfile";
import { setModalOpen } from "../../redux/reducers/UserReducer";
import { useFormik } from "formik";

type Props = {};

const Profile = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
  const { userLogin,ModalOpen } = useSelector((state: RootState) => {
    return state.UserReducer;
  });

 
  return (
    <>
      <div className="container">
        <div className="title-profile" style={{ textAlign: "center" }}>
          <h1>Profile</h1>
        </div>
        <div className="profile-wrap row">
          <div className="col-6">
            <img src="https://ui-avatars.com/api/?name=Bao%20Toan" alt="..." />
          </div>
          <div className="col-6">
            <div className="profile-content">
              <div className="form-group">
                <p>
                  Id <span className="required-icon">*</span>
                </p>
                <Input value={userLogin.id} disabled={true} />
              </div>
              <div className="form-group">
                <p>
                  Email <span className="required-icon">*</span>
                </p>
                <Input defaultValue={userLogin.email} readOnly />
              </div>
              <div className="form-group">
                <p>
                  Name <span className="required-icon">*</span>
                </p>
                <Input defaultValue={userLogin.name} readOnly/>
              </div>
              <div className="form-group">
                <p>
                  Phone number <span className="required-icon">*</span>
                </p>
                <Input defaultValue={userLogin.phoneNumber} readOnly/>
              </div>
             
            </div>
            <div className="group-button d-flex mt-3">
          
              <Button type="primary" htmlType="button" size="large" onClick={() => {
                dispatch(setModalOpen(true))
              }}>
                Update profile
              </Button>
            </div>
              {<UpdateProfile/>}
        
            {/* <UpdateProfile /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
