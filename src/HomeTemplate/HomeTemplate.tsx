import React, { useEffect, useState } from "react";
import type { MenuProps, MenuTheme } from "antd";
import { Layout, Menu, theme, Switch } from "antd";
import { history } from "..";
import { NavLink, Outlet } from "react-router-dom";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
  SearchOutlined,
  ProjectOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { getAllProject } from "../redux/reducers/ProjectReducer";
import { DispatchType, RootState } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { ACCESS_TOKEN, removeStore, USER_LOGIN } from "../util/config";

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Project", "project", <ProjectOutlined />, [
    getItem("Create project", "createProject"),
    getItem("Project Management", "projectManagement"),
  ]),

  getItem("User", "sub2", <UserOutlined />, [
    // getItem("View all users", "allUser", null),
    getItem("My account", "profile", null),
    getItem("User management", "userManagement", null),
  ]),

  getItem("Create task", "createTask", <PlusSquareOutlined />),
];

type Props = {};

const HomeTemplate: React.FC = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);

  const [theme, setTheme] = useState<MenuTheme>("dark");
  const [current, setCurrent] = useState("1");
  const changeTheme = (value: boolean) => {
    setTheme(value ? "dark" : "light");
  };
  const { userLogin } = useSelector((state: RootState) => {
    return state.UserReducer;
  });

  const dispatch: DispatchType = useDispatch();
  useEffect(() => {
    const action = getAllProject();
    dispatch(action);
    console.log(userLogin);
  }, []);

  const classNameFunction = (theme) => {
    if (theme === "dark") {
      return "profile-ava text-white text-align-center mt-3 ms-3";
    }
    return "profile-ava text-dark text-align-center mt-3 ms-3";
  };
  const onClick: MenuProps["onClick"] = (e: any) => {
    console.log("click ", e.key);
    let url: string = e.key;
    switch (url) {
      case "profile": {
        console.log("profile");
        history.push(`/home/profile`);
        break;
      }
      case "createTask": {
        console.log("createTask");
        history.push(`/home/createTask`);
        break;
      }
      case "createProject": {
        console.log("createProject");
        history.push(`/home/createProject`);
        break;
      }
      case "projectManagement": {
        console.log("projectManagement");
        history.push(`/home/projectManagement`);
        break;
      }
      case "userManagement": {
        console.log("user management");
        history.push(`/home/userManagement`);
        break;
      }
      default: {
        break;
      }
    }
    setCurrent(e.key);
  };
  return (
    <>
      <Layout style={{ height: "150vh" }}>
        {/* <Sidebar /> */}
        <Sider
          trigger={null}
          collapsible
          style={{ height: "150vh" }}
          theme={theme}
        >
          <div className={`profile-info ms-2`} id="home-info">
            <div className={classNameFunction(theme) }>
              <img className='mb-3' src={userLogin?.avatar} alt="..." />
              <h4>{userLogin?.name}</h4>
              <p>{userLogin?.email}</p>

              <NavLink
                to="/"
                onClick={() => {
                  removeStore(ACCESS_TOKEN);
                  removeStore(USER_LOGIN);
                }}
              >
                Log out
              </NavLink>
            </div>
          </div>
          <div
            className="change-theme"
            style={{ marginTop: "15px", marginLeft: "20px" }}
          ></div>
          <Menu
            theme={theme}
            onClick={onClick}
            style={{ width: "100%" }}
            defaultOpenKeys={["sub1"]}
            selectedKeys={[current]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          <Content
            style={{
              margin: "24px 16px",
              paddingTop: 10,
              minHeight: 280,
              paddingLeft: 40,
              paddingRight: 40,
              paddingBottom: 150,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default HomeTemplate;
