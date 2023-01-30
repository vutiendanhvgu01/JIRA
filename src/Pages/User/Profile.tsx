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
  const { userLogin, ModalOpen } = useSelector((state: RootState) => {
    return state.UserReducer;
  });

  return (
    <>
      <div className="container">
        <div className="title-profile" style={{ textAlign: "center" }}>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              marginBottom: "25px",
            }}
          >
            Profile
          </h1>
        </div>
        <div className="profile-wrap row">
          <div className="col-lg-6 col-xs-12 col-md-12 col-sm-12">
            <img
            className='ms-4'
              width={300}
              height={300}
              style={{ borderRadius: "50%", transform: "translateX(38%)" }}
              src={userLogin.avatar}
              alt="..."
            />
          </div>
          <div className="col-lg-6 col-xs-12 col-md-12 col-sm-12">
            <div className="profile-content">
              <div className="form-group">
                <p className="mb-2" style={{ fontSize: "24px" }}>
                  Id <span className="required-icon text-danger">*</span>
                </p>
                <Input size="large" value={userLogin.id} disabled={true} />
              </div>
              <div className="form-group">
                <p className="my-2" style={{ fontSize: "24px" }}>
                  Email <span className="required-icon text-danger">*</span>
                </p>
                <Input size="large" defaultValue={userLogin.email} readOnly />
              </div>
              <div className="form-group">
                <p className="my-2" style={{ fontSize: "24px" }}>
                  Name <span className="required-icon text-danger">*</span>
                </p>
                <Input size="large" defaultValue={userLogin.name} readOnly />
              </div>
              <div className="form-group">
                <p className="my-2" style={{ fontSize: "24px" }}>
                  Phone number{" "}
                  <span className="required-icon text-danger">*</span>
                </p>
                <Input
                  size="large"
                  defaultValue={userLogin.phoneNumber}
                  readOnly
                />
              </div>
            </div>
            <div className="group-button d-flex mt-3">
              <Button
                type="primary"
                htmlType="button"
                size="large"
                onClick={() => {
                  dispatch(setModalOpen(true));
                }}
              >
                Update profile
              </Button>
            </div>
            {<UpdateProfile />}

            {/* <UpdateProfile /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
