import { Dropdown, message, Space, Tooltip, AutoComplete, Avatar, Button, Input, Modal, Popover, Select, Slider, Tag } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/configStore'
import { addUserApi, getUserApi, setModalOpen } from '../../redux/reducers/UserReducer'
import ReactHtmlParser, {
    processNodes,
    convertNodeToElement,
    htmlparser2,
} from "react-html-parser";
import { Assigness } from './TypeProjectDetail'
import { PriorityTask, Status, TypeTask } from '../Task/TypeTask'
import { deletedCommentApi, insertComment, removeUserFromTaskApi, TypeAllComment, addUserFromTaskApi, updateEstimateApi, UpdateStatus, UpdatePriority, updateDescriptionApi, updateTimeTracking, getTaskDetailByApi, updateCommentApi } from '../../redux/reducers/TaskReducer'
import { CreateTypeTask, getProjectDetailApi, getTaskPriority, getTaskStatus, getTaskType } from '../../redux/reducers/ProjectReducer'
import { http } from '../../util/config'
import { useParams } from 'react-router'
import { EditOutlined, DeleteOutlined, DownOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from 'formik'
import type { MenuProps } from 'antd';

type Props = {}

const ModalTaskDetail = (props: Props) => {
    const { ModalOpen, userLogin } = useSelector((state: RootState) => { return state.UserReducer })
    const { TaskDetail, TaskIdDetail, AllComment } = useSelector((state: RootState) => { return state.TaskReducer })
    const { statusTask, taskType, Priority, detailProjectById } = useSelector((state: RootState) => {
        return state.ProjectReducer
    })
    const params = useParams()
    const [comment, setComment] = useState()
    const [trackingTime,setTrackingTime] = useState({
        timeTrackingSpent:TaskDetail?.timeTrackingSpent,
        timeTrackingRemaining:TaskDetail?.timeTrackingRemaining
    })
    const { user } = useSelector((state: RootState) => state.UserReducer);
    const [visibleEditor, setVisibleEditor] = useState(false)
    const [visibleComment,setVisibleComment] = useState(false)
    const contentCommet = useRef('')
    const dispatch: DispatchType = useDispatch()
    // Modal
    const handleCancel = () => {
        dispatch(setModalOpen(false))
        dispatch(getProjectDetailApi(params.id))
        dispatch(getTaskDetailByApi(TaskIdDetail))
        setComment(null)
    }
    const handleOk = () => {
        dispatch(setModalOpen(false))
        dispatch(getProjectDetailApi(params.id))
        dispatch(getTaskDetailByApi(TaskIdDetail))
    }

    // Comment
    const handleChangeComment = (e) => {
        const value = e.target.value
        setComment(value)
    }
    const updateStatusApi = async (data: UpdateStatus) => {
        const result = await http.put(`/api/Project/updateStatus`, data)
        console.log(result.data.content)
        const action = getProjectDetailApi(params.id)
        dispatch(action)
    }
    const updatePriorityApi = async (data: UpdatePriority) => {
        const result = await http.put('/api/Project/updatePriority', data)
        console.log(result.data.content)
        const action = getProjectDetailApi(params.id)
        dispatch(action)
    }
    const handleUpdateStatus = (value) => {
        const data = {
            taskId: Number(TaskIdDetail),
            statusId: value.toString(),
        }
        console.log(data)
        updateStatusApi(data)
    }
    const handleUpdatePriority = (value) => {
        const data = {
            taskId: TaskIdDetail,
            priorityId: value
        }
        console.log(data)
        updatePriorityApi(data)
    }
    const handlePressEnter = (e) => {
        const data = {
            taskId: TaskIdDetail,
            contentComment: comment
        }
        const action = insertComment(data)
        dispatch(action)
        setComment(null)
    }
    const handleEditcomment = (e) => {
        contentCommet.current = e.target.value
        console.log(contentCommet.current)
    }

    const handleEnterEditcomment = (e,id) => {
        console.log(e.target.value,id)
        const action = updateCommentApi(id,e.target.value,TaskDetail.taskId)
        dispatch(action)
        e.target.blur()
    }


    // Debounce Search
    const searchRef = useRef(null);
    const [value, setValue] = useState(null);
    const handleClose = (data) => {
        const actionRemoveUserTask = removeUserFromTaskApi(data)
        dispatch(actionRemoveUserTask)
    }
    // Change time
    const handleChangeEstimate = (e) => {

        console.log(e.target.value)

        const data = {
            taskId: Number(TaskIdDetail),
            originalEstimate: Number(e.target.value)
        }
        console.log(data)
        const actionUpdateEstimate = updateEstimateApi(data)
        dispatch(actionUpdateEstimate)

    }
    const handleChangeTrackingTime = (e) => {
        const value = Number(e.target.value)
        const name = e.target.name
        dataUpdateTimeTracking.current.taskId = TaskIdDetail
        dataUpdateTimeTracking.current[name] = value
      console.log(dataUpdateTimeTracking.current)
      const action = updateTimeTracking(dataUpdateTimeTracking.current)
      dispatch(action)
    }
    // Update Task
    const dataUpdateTimeTracking = useRef({
        taskId:TaskDetail.taskId,
        timeTrackingSpent:TaskDetail?.timeTrackingSpent,
        timeTrackingRemaining:TaskDetail?.timeTrackingRemaining
    })
    const renderEditor = () => {
        return <div>
            {visibleEditor ?
                <div>
                    <Editor
                        onEditorChange={(value) => {
                            console.log(value)
                            form.setFieldValue('description', value)
                        }}
                        initialValue={TaskDetail?.description}
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
                : <div onClick={() => {
                    setVisibleEditor(!visibleEditor)
                }}>{ReactHtmlParser(TaskDetail?.description)}</div>
            }
        </div>
    }
    // Formik
    const form = useFormik({
        initialValues: {
            description: '',
            timeTrackingSpent: null,
            timeTrackingRemaining: null
        },
        onSubmit: (value) => {
            console.log(value)
        }
    })
    // Dropdown Assign


    const handleMenuClick: MenuProps['onClick'] = (e) => {
        const data = {
            taskId: TaskIdDetail,
            userId: Number(e.key)
        }
        dispatch(addUserFromTaskApi(data, params.id))
    };
    const arrayAssign = detailProjectById?.members.filter((mem) => {
        let index = TaskDetail?.assigness.findIndex(us => us.id === mem.userId)
        if (index != -1) {
            return false
        }
        return true
    }).map((mem, index) => {
        return {
            label: mem.name,
            key: mem.userId.toString()
        }
    })

    const items: MenuProps['items'] = arrayAssign



    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (<>
        <Modal title={TaskDetail?.taskName} open={ModalOpen} onOk={handleOk} cancelText='Cancel' okText='Update' onCancel={handleCancel} width={980}>

            <div className="modal-header">
                <div className="task-title">
                    <i className="fa fa-bookmark text-success"></i>
                    <span style={{ fontWeight: 'bold' }}> {TaskDetail?.taskTypeDetail?.taskType} - {TaskDetail?.taskId}</span>
                </div>
                <div className="task-click d-flex">
                    <div>
                        <i className="fab fa-telegram-plane"></i>
                        <span style={{ paddingRight: 20 }}> Give feedback</span>
                    </div>
                    <div>
                        <i className="fa fa-link"></i>
                        <span style={{ paddingRight: 20 }}> Copy link</span>
                    </div>
                    <i className="fa fa-trash-alt='xyz'"></i>
                </div>

            </div>
            <div className="modal-body mt-4">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-8">
                            <div className="description" style={{ minHeight: 290 }}>
                                <p style={{ fontWeight: 'bold' }}>Description</p>
                                {/* <p>{ReactHtmlParser(TaskDetail?.description)}</p> */}
                                {renderEditor()}
                                <div className='button-description-block d-flex'>
                                    {visibleEditor ? <button className="btn btn-danger my-3 me-2" onClick={() => {
                                        setVisibleEditor(!visibleEditor)
                                    }}>Cancel</button> : ''}
                                    {visibleEditor ? <button className="btn btn-primary my-3" onClick={() => {
                                        setVisibleEditor(!visibleEditor)
                                        const des = form.getFieldProps('description').value
                                        const data = {
                                            taskId: Number(TaskIdDetail),
                                            description: des,
                                        }
                                        console.log(data)
                                        dispatch(updateDescriptionApi(data, TaskIdDetail))

                                    }}>Cập nhật</button> : <button className="btn btn-primary my-3" onClick={() => {
                                        setVisibleEditor(!visibleEditor)
                                    }}>Chỉnh sửa</button>}
                                </div>






                            </div>
                            <div className="comment">
                                <p style={{ fontWeight: 'bold' }}>Comment</p>
                                <div className="block-comment d-flex mt-3">
                                    <div className="avatar">
                                        <Avatar src={userLogin?.avatar}></Avatar>
                                    </div>
                                    <Input onChange={handleChangeComment} onPressEnter={handlePressEnter} className='ms-2' placeholder="Add a comment" value={comment} />

                                </div>
                                <p className='my-2'>
                                    <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                                    <span> press <span style={{ fontWeight: 'bold', color: '#b4ac6' }}>ENTER </span>to comment</span>
                                </p>
                            </div>
                            <div className="lastest-comment">

                                {AllComment?.map((comment: TypeAllComment, index) => {

                                    return <div className="comment-item row">
                                        <div className="display-comment col-1">
                                            <Avatar src={comment?.user.avatar}></Avatar>
                                        </div>
                                        <div className='col-11'>
                                            <div key={index} className='d-flex' >
                                                <div className="comment-item mr-2">
                                                    <p className='mb-2'>{comment?.user?.name}  <span>a month ago</span></p>
                                                    {!visibleComment ?<p>{comment.contentComment}</p> : <Input className='editComment' onBlur = {() => {
                                                        setVisibleComment(false)
                                                    }} onChange={handleEditcomment} 
                                                    onPressEnter = {(e) => {
                                                        handleEnterEditcomment(e,comment.id)
                                                    }}
                                                    defaultValue={comment.contentComment}/> }
                                                    

                                                </div>
                                                <div className="button-comment-block d-flex">
                                                    <Button onClick={() => {
                                                        setVisibleComment(!visibleComment)
                                                       
                                                    }} type='text' icon={<EditOutlined />} style={{ border: 'none', color: 'blue' }}>

                                                    </Button>
                                                    <Button onClick={() => {
                                                        const data = {
                                                            taskId: TaskIdDetail.toString(),
                                                            commentId: comment.id
                                                        }
                                                        dispatch(deletedCommentApi(data))
                                                    }} danger icon={<DeleteOutlined />} type="text" style={{ border: 'none' }}>

                                                    </Button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                })}

                            </div>
                        </div>

                        <div className="col-4">
                            <div className="status-block mb-3">
                                <h6>STATUS</h6>
                                <Select
                                    defaultValue={TaskDetail?.statusId}
                                    style={{ width: '100%' }}
                                    onSelect={
                                        handleUpdateStatus
                                    }
                                    options={statusTask?.map((item: Status, index: number) => {
                                        return {
                                            label: item.statusName,
                                            value: item.statusId
                                        }
                                    })}
                                />

                            </div>
                            <div className="assignees-block mb-3">
                                <h6>ASSIGNEES</h6>

                                {TaskDetail?.assigness?.map((item: Assigness, index: number) => {
                                    return <Tag closable key={index} onClose={() => {
                                        const data = {
                                            taskId: TaskIdDetail,
                                            userId: item.id
                                        }
                                        handleClose(data)
                                    }} className='py-1 m-1'>
                                        <Avatar src={item.avatar} /> {item.name}
                                    </Tag>

                                })}
                                <Dropdown menu={menuProps}>
                                    <Button>
                                        <Space>
                                            Add more
                                            <PlusOutlined />
                                        </Space>
                                    </Button>
                                </Dropdown>



                            </div>
                            <div className="priority-block mb-3">
                                <h6>PRIORITY</h6>
                                <Select
                                    defaultValue={TaskDetail?.priorityTask.priority}
                                    style={{ width: '100%' }}
                                    onSelect={handleUpdatePriority}
                                    options={Priority.map((item: PriorityTask) => {
                                        return {
                                            label: item.description,
                                            value: item.priorityId
                                        }
                                    })}
                                />

                            </div>
                            <div className="original-estinal mb-3">
                                <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                <Input onChange={handleChangeEstimate} defaultValue={TaskDetail?.originalEstimate} />

                            </div>
                            <div className="time-tracking">
                                <h6>TIME TRACKING</h6>
                                <div className="row">
                                    <div className="col-1" style={{ marginTop: '5px' }}>
                                        <i className="fa fa-clock"></i>
                                    </div>
                                    <div className="col-11">
                                        <Slider value={Number(TaskDetail?.timeTrackingSpent)} min={0} max={Number(TaskDetail?.timeTrackingSpent) + Number(TaskDetail?.timeTrackingRemaining)} />
                                    </div>

                                </div>
                                <div className="row mb-4">
                                    <div className="col-6 text-left">
                                        {TaskDetail?.timeTrackingSpent}h logged
                                    </div>
                                    <div className="col-6 text-end">
                                        {TaskDetail?.timeTrackingRemaining}h remaining
                                    </div>


                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <Input type='number' min={0} placeholder="Tracking"
                                    value={trackingTime.timeTrackingSpent}
                                        name='timeTrackingSpent' onChange={(e) => {
                                            setTrackingTime((prev) => {
                                                return {
                                                    ...prev,
                                                    timeTrackingSpent:Number(e.target.value)
                                                }
                                            })
                                            form.setFieldValue('timeTrackingSpent', e.target.value)
                                        }}
                                        
                                   
                                        onPressEnter={handleChangeTrackingTime}
                                    />
                                </div>
                                <div className="col-6">
                                    <Input type='number' min={0} placeholder="Remaining" 
                                    value={trackingTime.timeTrackingRemaining}name='timeTrackingRemaining' onChange={(e) => {
                                        setTrackingTime((prev) => {
                                            return {
                                                ...prev,
                                                timeTrackingRemaining:Number(e.target.value)
                                            }
                                        })
                                        form.setFieldValue('timeTrackingRemaining', e.target.value)
                                    }}
                           

                                        onPressEnter={handleChangeTrackingTime}
                                     
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    </>

    )
}

export default ModalTaskDetail