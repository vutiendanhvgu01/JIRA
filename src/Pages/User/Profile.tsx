import React from "react";
import { Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/configStore";
import UpdateProfile from "./UpdateProfile";

type Props = {};

const Profile = (props: Props) => {
  const dispatch: DispatchType = useDispatch();

  const { userLogin } = useSelector((state: RootState) => {
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
                <Input defaultValue={userLogin.name} />
              </div>
              <div className="form-group">
                <p>
                  Phone number <span className="required-icon">*</span>
                </p>
                <Input defaultValue={userLogin.phoneNumber} />
              </div>
              <div className="form-group">
                <p>
                  Password <span className="required-icon">*</span>
                </p>
                <Input placeholder="input with clear icon" allowClear />
              </div>
              <div className="form-group">
                <p>
                  Password confirmation <span className="required-icon">*</span>
                </p>
                <Input placeholder="input with clear icon" allowClear />
              </div>
            </div>
            <div className="group-button d-flex mt-3">
              <Button
                danger={true}
                htmlType="button"
                size="large"
                style={{ marginRight: "15px" }}
              >
                Cancel
              </Button>

              <Button type="primary" htmlType="button" size="large">
                Update
              </Button>
            </div>
            {/* <UpdateProfile /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
