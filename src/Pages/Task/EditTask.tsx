import { Input, Select } from 'antd'
import React, { useRef } from 'react'
import type { SelectProps } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configStore';
import { useFormik } from "formik";
import * as yup from "yup";
import { projectAll } from '../../redux/reducers/ProjectReducer';



const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};
const optionsAssigner: SelectProps['options'] = [];
type Props = {}


const EditTask: React.FC = (props: Props) => {
    const { allProjects } = useSelector((state: RootState) => {
        return state.ProjectReducer
    })
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            const valueDes: string = (((editorRef.current.getContent()).replace(/(&nbsp;)*/g, "")).replace(/(<p>)*/g, "")).replace(/<(\/)?p[^>]*>/g, "");
            return valueDes;
        }
    }



    console.log(allProjects)
  
  interface formTypeTask {

    }
 
    const form = useFormik<formTypeTask>({
        initialValues: {
            email: "",
            passWord: "",
        },
        validationSchema: yup.object().shape({
           
        }),
        onSubmit: (values: formTypeTask) => {
            
        },
    }
    )

    return (
        <>
            <h1>Edit Task</h1>
            <div className="form-group">
                <p>Project</p>
                <Select
                    placeholder='Project name'
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    options={allProjects.map((item:projectAll) => {
                        return {
                            value:item.id,
                            label:item.projectName
                        }
                    })
                }
                />
            </div>
            <div className="form-group">
                <p>Task name</p>
                <Input size="large" placeholder="Task name" />
            </div>
            <div className="form-group">
                <p>Status</p>
                <Select
                    defaultValue="backlog"
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    options={[
                        {
                            value: 'backlog',
                            label: 'BACKLOG',
                        },
                        {
                            value: 'selectedfordevelopment',
                            label: 'SELECTED FOR DEVELOPMENT',
                        },
                        {
                            value: 'inprogess',
                            label: 'IN PROGESS',
                        },
                        {
                            value: 'done',
                            label: 'DONE',
                        },
                    ]}
                />
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="priority-task">
                        <div className="form-group">
                            <p>Priority</p>
                            <Select
                                defaultValue="high"
                                style={{ width: '100%' }}
                                onChange={handleChange}
                                options={[
                                    {
                                        value: 'high',
                                        label: 'High',
                                    },
                                    {
                                        value: 'medium',
                                        label: 'Medium',
                                    },
                                    {
                                        value: 'low',
                                        label: 'Low',
                                    },
                                    {
                                        value: 'lowest',
                                        label: 'lowest',
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="task-type">
                        <div className="form-group">
                            <p>Task Type</p>
                            <Select
                                defaultValue="bug"
                                style={{ width: '100%' }}
                                onChange={handleChange}
                                options={[
                                    {
                                        value: 'bug',
                                        label: 'Bug',
                                    },
                                    {
                                        value: 'newtask',
                                        label: 'New Task',
                                    },

                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Editor
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
            <div className="form-group">
                <p>Assigners</p>
                <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    tokenSeparators={[',']}
                    options={optionsAssigner}
                />
            </div>

        </>
    )
}

export default EditTask