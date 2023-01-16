import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/configStore";
import { createProjectAPI, getProjectCategoryApi } from "../../redux/reducers/ProjectReducer";

type Props = {

};

const CreateProject = (props: Props) => {

  const { categoryProject } = useSelector(
    (state: RootState) => state.ProjectReducer
  );
  const dispatch: DispatchType = useDispatch();
  useEffect(() => {
    const action = getProjectCategoryApi();
    dispatch(action);
  }, []);


  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      let valueDes: string = (((editorRef.current.getContent()).replace(/(&nbsp;)*/g, "")).replace(/(<p>)*/g, "")).replace(/<(\/)?p[^>]*>/g, "")
      form.setFieldValue("description", valueDes)
    }


  };
  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      projectName: "",
      description: editorRef.current?.getContent(),
      categoryId: categoryProject[0]?.id,
    },
    onSubmit: (values) => {
      console.log(values);

      const action = createProjectAPI(values)
      dispatch(action)
    },
  });
  return (
    <div className="form-control m-3">
      <h3>Create Project</h3>
      <form className="container" onSubmit={form.handleSubmit}>
        <div className="form-group m-3">
          <p>Name</p>
          <input
            type="text"
            className="form-control"
            name="projectName"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </div>
        <div className="form-group m-3">
          <p>Description</p>
          <Editor
            onChange={form.handleChange}
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
        <div className="form-group m-3">
          <select
            name="categoryId"
            className="form-control"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
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
        <button className="btn btn-outline-primary" type="submit">
          Create project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
