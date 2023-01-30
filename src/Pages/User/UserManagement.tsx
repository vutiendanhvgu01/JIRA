import React, { useEffect, useState } from "react";
import type { TableProps } from "antd";
import { Button, Space, Table } from "antd";
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/configStore";
import {
  deleteUserManagementAPI,
  getUserApi,
} from "../../redux/reducers/UserReducer";
import { DeleteOutlined } from "@ant-design/icons";
type Props = {};
interface DataType {
  userId: number;
  name: string;
  avatar: string;
  email: string;
  phoneNumber: string;
}

// const data: DataType[] = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sidney No. 1 Lake Park",
//   },
//   {
//     key: "4",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
// ];
const UserManagement = (props: Props) => {
  const { user } = useSelector((state: RootState) => state.UserReducer);
  const dispatch: DispatchType = useDispatch();

  useEffect(() => {
    dispatch(getUserApi(""));
  }, []);
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});

  const handleChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<DataType>);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "Action",
      render: (_, record, index) => {
        console.log(record);
        return (
          <button className="btn btn-danger mr-2">
            <DeleteOutlined
              className="bg-danger"
              style={{ fontSize: 17 }}
              onClick={() => {
                dispatch(deleteUserManagementAPI(record.userId));
              }}
            />
          </button>
        );
      },
    },
  ];
  return (
    <>
      <div className="text-center">
        <h1 style={{fontSize:'30px',fontWeight:'bold'}}>USER MANAGEMENT</h1>
      </div>
      <div className="mt-5">
        {/* <Space style={{ marginBottom: 16 }}>
          <Button onClick={setAgeSort}>Sort age</Button>
          <Button onClick={clearFilters}>Clear filters</Button>
          <Button onClick={clearAll}>Clear filters and sorters</Button>
        </Space> */}
        <Table
          columns={columns}
          rowKey={"id"}
          dataSource={user}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default UserManagement;
