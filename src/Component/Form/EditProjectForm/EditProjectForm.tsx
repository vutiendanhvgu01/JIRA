import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../../redux/configStore";
import {
  getProjectCategoryApi,
  updateProjectAPI,
} from "../../../redux/reducers/ProjectReducer";
import * as yup from "yup";

type Props = {};

const EditProjectForm = (props: Props) => {
  const { categoryProject, projectEdit } = useSelector(
    (state: RootState) => state.ProjectReducer
  );
  const dispatch: DispatchType = useDispatch();
  const submitForm = (e: any) => {
    e.preventDefault();
    alert("submit edit");
  };
  useEffect(() => {
    const action = getProjectCategoryApi();
    dispatch(action);
  }, []);
  useEffect(() => {
    dispatch({
      type: "SET_SUBMIT_EDIT_PROJECT",
      submitFunction: form.handleSubmit,
    });
  }, []);
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  useEffect(() => {
    form.setFieldValue("description", editorRef.current?.getContent());
    form.setFieldValue("categoryId", projectEdit.categoryId);
  }, [projectEdit.id]);
  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: projectEdit.id,
      projectName: projectEdit.projectName,
      description: editorRef.current?.getContent(),
      categoryId: projectEdit.categoryId,
    },
    validationSchema: yup.object().shape({}),
    onSubmit: (values) => {
      console.log(values);
      dispatch(updateProjectAPI(values));
    },
  });
  return (
    <form className="container" onSubmit={form.handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project id</p>
            <input
              value={form.values.id}
              className="form-control"
              name="id"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              disabled={true}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Name</p>
            <input
              value={form.values.projectName}
              className="form-control"
              name="projectName"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project category</p>
            <select
              name="categoryId"
              className="form-control"
              value={form.values.categoryId}
              onChange={(e) => {
                form.setFieldValue("categoryId", e.target.value);
              }}
            >
              {categoryProject.map((item, index) => {
                return (
                  <option value={item.id} key={index}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Description</p>
            <Editor
              initialValue={projectEdit.description}
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                height: 300,
                menubar: false,
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
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditProjectForm;
