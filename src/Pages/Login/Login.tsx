import React from "react";
import { Layout } from "antd";
import {
  UserOutlined,
  LockOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Button, Input, Space } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
// import { history } from "../..";
import { useFormik } from "formik";
import * as yup from "yup";
import { loginAsyncApi } from "../../redux/reducers/UserReducer";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../redux/configStore";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
const { Sider, Content } = Layout;
type Props = {};
export interface UserLoginModel {
  email: string;
  passWord: string;
}
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});
const Login = (props: Props) => {
  // const handleLogin = () => {
  //   history.push("/home");
  // };
  const [{ width, height }, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    window.onresize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
  }, []);
  const dispatch: DispatchType = useDispatch();
  const form = useFormik<UserLoginModel>({
    initialValues: {
      email: "",
      passWord: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Email cannot be blank!")
        .email("Email is invalid!"),
      passWord: yup.string().required("Password cannot be blank!"),
    }),
    onSubmit: (values: UserLoginModel) => {
      console.log(values);
      const action = loginAsyncApi(values);
      dispatch(action);
    },
  });

  return (
    <>
      <Layout>
        <Sider
          style={{
            height: height,
            backgroundImage: `url(https://picsum.photos/${Math.round(
              width / 2
            )}/${height / 2})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          width={width / 2}
        ></Sider>
        <Content>
          <form
            onSubmit={form.handleSubmit}
            className="container d-flex justify-content-center align-items-center"
            style={{ flexDirection: "column", paddingTop: "280px" }}
          >
            <h3 className='mb-3' style={{fontSize:'25px',fontWeight:'500'}}>Login</h3>
            <div className="form-group">
              <p>User name</p>
              <Input
                name="email"
                size="large"
                prefix={<UserOutlined />}
                placeholder="email"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.email && (
                <p className="text-danger">{form.errors.email}</p>
              )}
            </div>
            <div className="form-group">
              <p>Password</p>
              <Input.Password
                style={{width:'225px'}}
                name="passWord"
                size="large"
                prefix={<LockOutlined />}
                placeholder="password"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.passWord && (
                <p className="text-danger">{form.errors.passWord}</p>
              )}
            </div>
            <div className="form-group mt-3">
              <p>
                Don't have an account yet!
                <NavLink to="/register">
                  <span className="text-primary"> Register now !</span>
                </NavLink>
              </p>
            </div>
            <div className="form-group">
              <Button
                onSubmit={form.handleSubmit}
                htmlType="submit"
                size="large"
                className="mt-3"
                style={{ backgroundColor: "rgb(102,117,223" }}
                // onClick={() => {
                //   handleLogin();
                // }}
              >
                Login
              </Button>
            </div>
            <div className="socail mt-3 d-flex">
              <Button
                shape="circle"
                className="font-weight-bold"
                style={{ backgroundColor: "rgb(59,89,152", color: "white" }}
                icon={<FacebookOutlined style={{transform:'translateY(-3px)',fontSize:'20px'}}/>}
                size="large"
              ></Button>
        
              <Button
                type="primary"
                className="ms-3 font-weight-bold"
                shape="circle"
                icon={<TwitterOutlined />}
                size="large"
              ></Button>
            </div>
          </form>
        </Content>
      </Layout>
    </>
  );
};

export default Login;
