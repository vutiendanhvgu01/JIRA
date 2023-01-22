import { Input, Select } from "antd";
import React, { useRef } from "react";
import type { SelectProps } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/configStore";
import { useFormik } from "formik";
import * as yup from "yup";
import { projectAll } from "../../redux/reducers/ProjectReducer";
import { PriorityTask, Status, TypeTask } from "./TypeTask";
import "../../Assets/scss/pages/Task/_createTask.scss";
import { MessageOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Button } from "antd";

const optionsAssigner: SelectProps["options"] = [];
type Props = {};

const CreateTask: React.FC = (props: Props) => {
  const assignRef = useRef<string>(null);
  const editorRef = useRef(null);
  const editorValue = useRef(null);
  const { allProjects, statusTask, taskType, Priority } = useSelector(
    (state: RootState) => {
      return state.ProjectReducer;
    }
  );
  const handleChangeAntd = (value: string) => {
    console.log(value);
    assignRef.current = value;
  };
  if (editorRef.current) {
    editorValue.current = editorRef.current
      .getContent()
      .replace(/(&nbsp;)*/g, "")
      .replace(/(<p>)*/g, "")
      .replace(/<(\/)?p[^>]*>/g, "");
  }

  interface formTypeTask {
    listUserAsign?: number[];
    taskName?: string;
    description?: string;
    statusId?: string;
    originalEstimate?: number;
    timeTrackingSpent?: number;
    timeTrackingRemaining?: number;
    projectId?: number;
    typeId?: number;
    priorityId?: number;
  }

  const form = useFormik({
    initialValues: {
      projectId: "",
      statusId: statusTask[0].statusId,
      priorityId: Priority[0].priorityId,
      taskType: taskType[0].id,
      taskName: "",
      description: '',
    },
    validationSchema: yup.object().shape({}),
    onSubmit: (values) => {
      values.description = editorRef.current.getContent()
      console.log(values);
    },
  });

  const handleEdit = () => {};

  return (
    <>
      <div className="createTask-content">
        <h1>Create Task</h1>
        <form onSubmit={form.handleSubmit} className="form-createTask">
          <div className="form-group">
            <p className="title-createTask">Project</p>
            <div className="wrap-select">
              <select
                className="w-100 createTask-select"
                name="projectId"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              >
                {allProjects?.map((item: projectAll) => {
                  return <option value={item.id}>{item.projectName}</option>;
                })}
              </select>
              <CaretDownOutlined className="arrowDown" />
            </div>
          </div>
          <div className="form-group">
            <p className="title-createTask">Task name</p>
            <Input
              size="large"
              placeholder="Task name"
              name="taskName"
              onChange={form.handleChange}
            />
          </div>
          <div className="form-group">
            <p className="title-createTask">Status</p>
            <div className="wrap-select">
              <select
                className="w-100 createTask-select"
                name="statusId"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              >
                {statusTask?.map((item: Status) => {
                  return (
                    <option value={item.statusId}>{item.statusName}</option>
                  );
                })}
              </select>
              <CaretDownOutlined className="arrowDown" />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="priority-task">
                <div className="form-group">
                  <p className="title-createTask">Priority</p>
                  <div className="wrap-select">
                    <select
                      className="w-100 createTask-select"
                      name="priorityId"
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    >
                      {Priority?.map((item: PriorityTask) => {
                        return (
                          <option value={item.priorityId}>
                            {item.priority}
                          </option>
                        );
                      })}
                    </select>
                    <CaretDownOutlined className="arrowDown" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="task-type">
                <div className="form-group">
                  <p className="title-createTask">Task Type</p>
                  <div className="wrap-select">
                    <select
                      className="w-100 createTask-select"
                      name="typeId"
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    >
                      {taskType?.map((item: TypeTask) => {
                        return <option value={item.id}>{item.taskType}</option>;
                      })}
                    </select>
                    <CaretDownOutlined className="arrowDown" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Editor
            onChange={form.handleChange}
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
              height: 300,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
          <div className="form-group" style={{ marginTop: "15px" }}>
            <p className="title-createTask">Assigners</p>
            <Select
              mode="tags"
              style={{ width: "100%" }}
              onChange={handleChangeAntd}
              tokenSeparators={[","]}
              options={[
                { value: 1, label: 1 },
                { value: 2, label: 2 },
              ]}
            />
          </div>
          <Button type="primary" htmlType="submit" size="large">
            Submit
          </Button>
          <Button
            danger={true}
            htmlType="button"
            size="large"
            onClick={() => {
              handleEdit();
            }}
          >
            Edit
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateTask;
