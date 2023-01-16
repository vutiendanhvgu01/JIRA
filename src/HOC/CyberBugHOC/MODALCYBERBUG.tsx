import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { DispatchType, RootState } from "../../redux/configStore";

const { Option } = Select;
type Props = {};

const MODALCYBERBUG = (props: any) => {
  console.log(props);
  const { visible, ComponentContentDrawer, callBackSubmit } = useSelector(
    (state: RootState) => state.drawerReducer
  );
  const dispatch: DispatchType = useDispatch();
  const showDrawer = () => {
    dispatch({ type: "OPEN_DRAWER", visible: true });
  };

  const onClose = () => {
    dispatch({ type: "CLOSE_DRAWER", visible: false });
  };
  console.log(visible);
  return (
    <>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        open={visible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={callBackSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {ComponentContentDrawer}
      </Drawer>
    </>
  );
};

export default MODALCYBERBUG;
