import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { DispatchType, RootState } from "../../redux/configStore";
import {
  getAllProject,
  getAllProjectAPI,
  getProjectDetailApi,
  getTaskPriority,
  getTaskStatus,
  getTaskType,
} from "../../redux/reducers/ProjectReducer";
import {
  Member,
  TypeProjectDetail,
  LstTask,
  LstTaskDeTail,
} from "./TypeProjectDetail";
import { AutoComplete, Avatar, Button, Input, Popover, Space } from "antd";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import {
  getAllCommentApi,
  getTaskDetailByApi,
  getTaskDetailIdAction,
  removeTask,
  updateStatusApi,
} from "../../redux/reducers/TaskReducer";
import {
  addUserApi,
  deleteUserApi,
  getUserApi,
  setModalOpen,
} from "../../redux/reducers/UserReducer";
import ModalTaskDetail from "./ModalTaskDetail";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
type Props = {};

const ProjectDetail = (props: Props) => {
  const { Search } = Input;
  const onSearch = (value: string) => {};
  const [value, setValue] = useState("");
  const searchRef = useRef(null);
  const dispatch: DispatchType = useDispatch();
  const { detailProjectById } = useSelector((state: RootState) => {
    return state.ProjectReducer;
  });
  const param = useParams();
  const { user } = useSelector((state: RootState) => state.UserReducer);
  useEffect(() => {
    const action = getAllProject();
    dispatch(action);
    const actionGetProject = getProjectDetailApi(param.id);
    dispatch(actionGetProject);
  }, []);
  // Drag Drop
  const handleDragEnd = (result) => {
    let { source, destination } = result;
    if (!destination) {
      return;
    }
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }
    const dataUpdateStatus = {
      taskId: Number(result.draggableId),
      statusId: destination.droppableId,
    };
    console.log(dataUpdateStatus);
    dispatch(updateStatusApi(dataUpdateStatus, param.id));
  };
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <NavLink to="/home" style={{ textDecoration: "none" }}>
            Home
          </NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink
            to="/home/projectManagement"
            style={{ textDecoration: "none" }}
          >
            Project management
          </NavLink>
        </Breadcrumb.Item>

        <Breadcrumb.Item>{detailProjectById?.projectName}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="projectDetail-container">
        <h3 className="mb-4" style={{ fontSize: 30, fontWeight: "bold" }}>
          Cyber Board
        </h3>
        <div className="projectDetail-header">
          <h5 style={{ fontWeight: "bold" }}>
            {detailProjectById?.projectName}
          </h5>
          <div className="projectDetail-wrap d-flex ">
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              style={{ width: 250, marginTop: 20 }}
            />

            {detailProjectById?.members?.map(
              (member: Member, index: number) => {
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
                            {detailProjectById.members?.map(
                              (item: any, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{item.userId}</td>
                                    <td>
                                      <img
                                        src={item.avatar}
                                        width="50"
                                        height="50"
                                        alt="..."
                                      />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>
                                      <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                          dispatch(
                                            deleteUserApi(
                                              {
                                                projectId: Number(param.id),
                                                userId: item.userId,
                                              },
                                              param.id
                                            )
                                          );
                                          dispatch(
                                            getProjectDetailApi(param.id)
                                          );
                                        }}
                                      >
                                        x
                                      </button>
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      );
                    }}
                  >
                    <Avatar
                      key={index}
                      src={member?.avatar}
                      style={{
                        marginTop: 20,
                        marginLeft: 10,
                      }}
                    ></Avatar>
                  </Popover>
                );
              }
            )}

            <div style={{ marginTop: 20, marginLeft: 15 }}>
              <Popover
                placement="topLeft"
                title={"Add user"}
                style={{ marginLeft: 20 }}
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
                        setValue(option?.label);

                        dispatch(
                          addUserApi(
                            {
                              projectId: Number(param.id),
                              userId: Number(valueSelect),
                            },
                            param.id
                          )
                        );
                        dispatch(getProjectDetailApi(param.id));
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

            <button
              className="btn btn-primary "
              style={{ marginTop: 20, marginRight: 20, marginLeft: 10 }}
            >
              Only My Issue
            </button>
            <button className="btn btn-danger" style={{ marginTop: 20 }}>
              Recently Updated
            </button>
          </div>
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="projectDetail-body row mt-4">
            {detailProjectById?.lstTask?.map((item: LstTask, index: number) => {
              return (
                <Droppable droppableId={item.statusId}>
                  {(provided) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="card-wrap col-3"
                        key={index}
                      >
                        <div className="card backlog">
                          <div className="card-header">
                            <p className="card-title">{item?.statusName}</p>
                          </div>
                          <div
                            className="card-body"
                            style={{ padding: 8, background: "#f7f7f7" }}
                          >
                            {item?.lstTaskDeTail.map(
                              (lstTask: LstTaskDeTail, index: number) => {
                                return (
                                  <Draggable
                                    key={lstTask.taskId.toString()}
                                    index={index}
                                    draggableId={lstTask.taskId.toString()}
                                  >
                                    {(provided) => {
                                      return (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          <li
                                            onClick={() => {
                                              const actionTaskId =
                                                getTaskDetailIdAction(
                                                  lstTask.taskId
                                                );
                                              dispatch(actionTaskId);
                                              const actionTaskDetail =
                                                getTaskDetailByApi(
                                                  lstTask.taskId
                                                );
                                              dispatch(actionTaskDetail);
                                              dispatch(setModalOpen(true));
                                            }}
                                            key={index}
                                            className="list-group-item p-4 mb-2"
                                            style={{
                                              cursor: "pointer",
                                              background: "white",
                                            }}
                                          >
                                            <div
                                              className="block-task-name row mb-2"
                                              style={{
                                                justifyContent: "space-between",
                                              }}
                                            >
                                              <p className="mb-3 col-4">
                                                {ReactHtmlParser(
                                                  lstTask?.taskName
                                                )}
                                              </p>
                                              <div className="col-4"></div>
                                              <button
                                                style={{
                                                  transform: "translateY(-8px)",
                                                }}
                                                className="btn delete-task text-danger col-4"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  dispatch(
                                                    removeTask(
                                                      lstTask.taskId,
                                                      param.id
                                                    )
                                                  );
                                                }}
                                              >
                                                Delete
                                              </button>
                                            </div>

                                            <div
                                              className="block d-flex"
                                              style={{
                                                justifyContent: "space-between",
                                              }}
                                            >
                                              <div className="block-left">
                                                <p className="text-danger">
                                                  {
                                                    lstTask.priorityTask
                                                      .priority
                                                  }
                                                </p>
                                              </div>
                                              <div className="block-right">
                                                <div className="avatar-group">
                                                  {lstTask?.assigness.map(
                                                    (memberAssign, index) => {
                                                      return (
                                                        <Avatar
                                                          key={index}
                                                          className="avatar"
                                                          src={
                                                            memberAssign?.avatar
                                                          }
                                                        ></Avatar>
                                                      );
                                                    }
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                        </div>
                                      );
                                    }}
                                  </Draggable>
                                );
                              }
                            )}
                            {provided.placeholder}
                          </div>
                        </div>
                      </div>
                    );
                  }}
                </Droppable>
              );
            })}
          </div>
        </DragDropContext>
      </div>
      {<ModalTaskDetail />}
    </>
  );
};

export default ProjectDetail;
