import { Input, InputNumber, Select, Slider } from "antd";
import React, { useRef, useState,useEffect } from "react";
import type { SelectProps } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/configStore";
import { useFormik } from "formik";
import * as yup from "yup";
import { createTaskApi, getAllProject, projectAll } from "../../redux/reducers/ProjectReducer";
import { PriorityTask, Status, TypeTask } from "./TypeTask";
import "../../Assets/scss/pages/Task/_createTask.scss";
import { MessageOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { getUserByProjectIdApi, UserByProjectId } from "../../redux/reducers/UserReducer";

const optionsAssigner: SelectProps["options"] = [];
type Props = {};

const CreateTask: React.FC = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
  const { allProjects, statusTask, taskType, Priority } = useSelector(
    (state: RootState) => {
      return state.ProjectReducer;
    }
  );
  const {userByProjectId } = useSelector(
    (state: RootState) => {
      return state.UserReducer;
    }
  );
  useEffect(() => {
    const action1 = getAllProject();
    dispatch(action1);
    const action = getUserByProjectIdApi(allProjects[0].id.toString())
    dispatch(action)


  }, []);
  const assignRef = useRef<string>(null);
  const editorRef = useRef(null);
  const editorValue = useRef(null);
  const [timeTracking,setTimeTracking] = useState({
    timeTrackingSpent:0,
    timeTrackingRemaining:0,
  })

  const handleChangeAntd = (value: string) => {
    console.log(value);
    assignRef.current = value;
    form.setFieldValue('listUserAsign',value)
  };
  if (editorRef.current) {
    editorValue.current = editorRef.current
      .getContent()
      .replace(/(&nbsp;)*/g, "")
      .replace(/(<p>)*/g, "")
      .replace(/<(\/)?p[^>]*>/g, "");
  }



  const form = useFormik({
    initialValues: {
      listUserAsign:[0],
      taskName: "",
      description: '',
      statusId: statusTask[0].statusId,
      originalEstimate:1,
      timeTrackingSpent: 1,
      timeTrackingRemaining: 1,
      projectId: allProjects[0].id,
      typeId: 1,
      priorityId: Priority[0].priorityId,
    },
    validationSchema: yup.object().shape({}),
    onSubmit: (values) => {
      values.description = editorRef.current.getContent()
      const data = {
        listUserAsign:values.listUserAsign,
        taskName: values.taskName,
        description: values.description,
        statusId: values.statusId.toString(),
        originalEstimate:Number(values.originalEstimate),
        timeTrackingSpent: Number(values.timeTrackingSpent),
        timeTrackingRemaining: Number(values.timeTrackingRemaining),
        projectId: Number(values.projectId),
        typeId: Number(values.typeId),
        priorityId: Number(values.priorityId),
      }
      console.log(data);
      const action = createTaskApi(data);
      dispatch(action)
    },
  });

  const handleChangeInput = (e) => {
    const value= e.target.value
    const name = e.target.name
    console.log(name,value)
    setTimeTracking((prev) => {
      return {
        ...prev,
        [name]: value,

      }
    })
    form.setFieldValue(name, Number(value))
   };
   const handleChangeProject = (e) => {
  
    const value = e.target.value
    const action = getUserByProjectIdApi(value)
    dispatch(action)
    console.log(value)
    form.setFieldValue('projectId',Number(value))
    console.log(userByProjectId)
   }
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
                onChange={handleChangeProject}
                onBlur={form.handleBlur}
              >
                {allProjects?.map((item: projectAll,index:number) => {
                  return <option key={index} value={item.id}>{item.projectName}</option>;
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
                {statusTask?.map((item: Status,index:number) => {
                  return (
                    <option key={index} value={item.statusId}>{item.statusName}</option>
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
                      {Priority?.map((item: PriorityTask,index:number) => {
                        return (
                          <option key={index} value={item.priorityId}>
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
                      {taskType?.map((item: TypeTask,index:number) => {
                        return <option key={index} value={item.id}>{item.taskType}</option>;
                      })}
                    </select>
                    <CaretDownOutlined className="arrowDown" />
                  </div>
                </div>
              </div>
            </div>
            <div className="timeTrackingWrap">
              <p>Time Tracking</p>
              <Slider  value={Number(timeTracking.timeTrackingSpent)} min={0} max={Number(timeTracking.timeTrackingSpent)+ Number(timeTracking.timeTrackingRemaining)} />
              <div className="row mb-4">
                <div className="col-6 text-left">
                  {timeTracking.timeTrackingSpent}h logged
                </div>
                <div className="col-6 text-end">
                  {timeTracking.timeTrackingSpent}h remaining
                </div>
              </div>
              <div className="time-estimate row">
              <div className="col-4">
                  <p>Original Estimate</p>
                  <input type='number' className=" w-100 py-2 ps-3" name='originalEstimate' onChange={handleChangeInput} onBlur={form.handleBlur}  min={0} max={100000} defaultValue={0} />
                </div>
                <div className="col-4">
                  <p>Time spent {`(hours)`}</p>
                  <input type='number' onChange={handleChangeInput} onBlur={form.handleBlur} className=' w-100 py-2 ps-3' name='timeTrackingSpent' min={0} max={100000} defaultValue={0} />

                </div>
                <div className="col-4">
                  <p>Time remaining {`(hours)`}</p>
                  <input type='number' className="w-100  py-2 ps-3" name='timeTrackingRemaining' onChange={handleChangeInput} onBlur={form.handleBlur}  min={0} max={100000} defaultValue={0} />
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
              options = {userByProjectId?.map((user:UserByProjectId) => {
                return {
                  value: user.userId,
                  label:user.name
                }
              })}
            />
          </div>
          <Button type="primary" htmlType="submit" size="large">
            Submit
          </Button>
          <Button
            danger={true}
            htmlType="button"
            size="large"
         
          >
            Edit
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateTask;
