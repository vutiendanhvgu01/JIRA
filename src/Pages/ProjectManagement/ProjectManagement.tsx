import React, { useRef, useState } from "react";
import { AutoComplete, Avatar, Popover, TableProps, Tag } from "antd";
import { Button, Space, Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { DispatchType, RootState } from "../../redux/configStore";
import {
  deleteProjectAPI,
  getAllProjectAPI,
  getProjectEditAction,
} from "../../redux/reducers/ProjectReducer";
import { message, Popconfirm } from "antd";
import EditProjectForm from "../../Component/Form/EditProjectForm/EditProjectForm";
import {
  addUserApi,
  deleteUserApi,
  getUserApi,
} from "../../redux/reducers/UserReducer";
import { number } from "yup";
import { NavLink } from "react-router-dom";

type Props = {};
interface DataType {
  members: [];
  creator: {
    id: number;
    name: string;
  };
  id: number;
  projectName: string;
  description: string;
  categoryId: number;
  categoryName: string;
  alias: string;
  deleted: boolean;
}

const ProjectManagement = (props: Props) => {
  const { projectDetail } = useSelector(
    (state: RootState) => state.ProjectReducer
  );
  const { user } = useSelector((state: RootState) => state.UserReducer);
  const [value, setValue] = useState("");
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
  const dispatch: DispatchType = useDispatch();
  const searchRef = useRef(null);
  console.log(projectDetail);
  useEffect(() => {
    const action = getAllProjectAPI();
    dispatch(action);
  }, []);
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
      title: "id",
      dataIndex: "id",
      key: "id",
      filters: [
        { text: "Joe", value: "Joe" },
        { text: "Jim", value: "Jim" },
      ],
      sorter: (item2, item1) => {
        return item2.id - item1.id;
      },
    },
    {
      title: "projectName",
      dataIndex: "projectName",
      render: (text, record, index) => {
        return (
          <NavLink to={`/home/projectdetail/${record.id}`}>{text}</NavLink>
        );
      },
      key: "projectName",
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName.trim().toLowerCase();
        let projectName2 = item2.projectName.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
      render: (text, record, index) => {
        const tsxContent = ReactHtmlParser(text);

        return <div>{tsxContent}</div>;
      },
    },
    {
      title: "category",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (item2, item1) => {
        let categoryName1 = item1.categoryName.trim().toLowerCase();
        let categoryName2 = item2.categoryName.trim().toLowerCase();
        if (categoryName2 < categoryName1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "creator",

      key: "creator",
      render: (text, record, index) => {
        return <Tag color="green">{record.creator?.name}</Tag>;
      },
      sorter: (item2, item1) => {
        let creator1 = item1.creator?.name.trim().toLowerCase();
        let creator2 = item2.creator?.name.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "member",
      key: "member",
      render: (text, record, index) => {
        return (
          <div>
            {record.members?.slice(0, 3).map((member: any, index) => {
              return (
                <Popover
                  key={index}
                  placement="top"
                  title={"member"}
                  content={() => {
                    return (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>id</th>
                            <th>avatar</th>
                            <th>name</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.members?.map((item: any, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.userId}</td>
                                <td>
                                  <img
                                    src={item.avatar}
                                    width="50"
                                    height="50"
                                    alt=""
                                  />
                                </td>
                                <td>{item.name}</td>
                                <td>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                      dispatch(
                                        deleteUserApi({
                                          projectId: record.id,
                                          userId: item.userId,
                                        },2)
                                      );
                                    }}
                                  >
                                    x
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >
                  <Avatar key={index} src={member.avatar} />
                </Popover>
              );
            })}
            {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}
            <Popover
              placement="topLeft"
              title={"Add user"}
              content={() => {
                return (
                  <AutoComplete
                    options={user?.map((us, index) => {
                      return { label: us.name, value: us.userId.toString() };
                    })}
                    value={value}
                    onChange={(text) => {
                      setValue(text);
                    }}
                    onSelect={(valueSelect, option) => {
                      setValue(option.label);

                      dispatch(
                        addUserApi({
                          projectId: record.id,
                          userId: Number(valueSelect),
                        },2)
                      );
                    }}
                    style={{ width: "100%" }}
                    onSearch={(value) => {
                      if (searchRef.current) {
                        clearInterval(searchRef.current);
                      }
                      searchRef.current = setTimeout(() => {
                        dispatch(getUserApi(value));
                      }, 300);
                    }}
                  />
                );
              }}
              trigger="click"
            >
              <Button>+</Button>
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record, index) => (
        <Space size="middle">
          <button
            className="btn btn-primary mr-2"
            onClick={() => {
              dispatch({
                type: "OPEN_FORM_EDIT_PROJECT",
                Component: <EditProjectForm />,
              });
              console.log(record);
              dispatch(getProjectEditAction(record));
            }}
          >
            <EditOutlined className="bg-primary" style={{ fontSize: 17 }} />
          </button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this project?"
            onConfirm={() => {
              dispatch(deleteProjectAPI(record.id));
            }}
            okText="Yes"
            cancelText="No"
          >
            <button className="btn btn-danger mr-2">
              <DeleteOutlined className="bg-danger" style={{ fontSize: 17 }} />
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className="text-center" style={{fontSize:'30px',fontWeight:'bold'}}>Project Management</div>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        rowKey={"id"}
        dataSource={projectDetail}
        onChange={handleChange}
      />
    </>
  );
};
export default ProjectManagement;
