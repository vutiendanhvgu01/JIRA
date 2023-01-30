import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import { DispatchType } from "../../redux/configStore";
import { useDispatch } from "react-redux";
import { registerApi } from "../../redux/reducers/UserReducer";
import { NavLink } from "react-router-dom";
type Props = {};
export interface RegisterModel {
  email: string;
  passWord: string;
  name: string;
  phoneNumber: string;
}
const { Sider, Content } = Layout;
const Register = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
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
  const form = useFormik<RegisterModel>({
    initialValues: {
      email: "",
      passWord: "",
      name: "",
      phoneNumber: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Email cannot be blank!")
        .email("Email is invalid!"),
      passWord: yup.string().required("Password cannot be blank!"),
      name: yup.string().required("Name can not be blank!"),
      phoneNumber: yup.string().required("Phone number can not be blank!"),
    }),
    onSubmit: (values: RegisterModel) => {
      console.log(values);
      dispatch(registerApi(values));
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
            className="container d-flex justify-content-center align-items-center"
            style={{ flexDirection: "column", paddingTop: "200px" }}
            onSubmit={form.handleSubmit}
          >
            <h3>Sign up</h3>
            <div className="form-group">
              <p>Email</p>
              <Input
                name="email"
                size="large"
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
              <Input
                name="passWord"
                size="large"
                placeholder="password"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.passWord && (
                <p className="text-danger">{form.errors.passWord}</p>
              )}
            </div>
            <div className="form-group">
              <p>Name</p>
              <Input
                name="name"
                size="large"
                placeholder="Name"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.name && (
                <p className="text-danger">{form.errors.name}</p>
              )}
            </div>
            <div className="form-group">
              <p>Phone number</p>
              <Input
                name="phoneNumber"
                size="large"
                placeholder="Phone number"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.phoneNumber && (
                <p className="text-danger">{form.errors.phoneNumber}</p>
              )}
            </div>
            <div className="form-group pt-5">
              <p>
                Already have an account!
                <NavLink to="/" className="text-secondary">
                  {" "}
                  Log in now !
                </NavLink>
              </p>
            </div>
            <div className="form-group">
              <Button
                onSubmit={form.handleSubmit}
                htmlType="submit"
                size="large"
                className="mt-5"
                style={{ backgroundColor: "rgb(102,117,223" }}
                // onClick={() => {
                //   handleLogin();
                // }}
              >
                Submit
              </Button>
            </div>
          </form>
        </Content>
      </Layout>
    </>
  );
};

export default Register;
