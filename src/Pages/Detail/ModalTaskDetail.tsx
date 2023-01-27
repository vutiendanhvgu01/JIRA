import { AutoComplete, Avatar, Button, Input, Modal, Popover, Select, Slider, Tag } from 'antd'
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
import { deletedCommentApi, insertComment, removeUserFromTaskApi, TypeAllComment,addUserFromTaskApi, updateEstimateApi, UpdateStatus} from '../../redux/reducers/TaskReducer'
import { CreateTypeTask, getProjectDetailApi, getTaskPriority, getTaskStatus, getTaskType } from '../../redux/reducers/ProjectReducer'
import { http } from '../../util/config'
import { useParams } from 'react-router'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
type Props = {}

const ModalTaskDetail = (props: Props) => {
    const { ModalOpen, userLogin } = useSelector((state: RootState) => { return state.UserReducer })
    const { TaskDetail, TaskIdDetail, AllComment } = useSelector((state: RootState) => { return state.TaskReducer })
    const { statusTask, taskType, Priority, detailProjectById } = useSelector((state: RootState) => {
        return state.ProjectReducer
    })
    const params = useParams()
    const [comment, setComment] = useState()
    const { user } = useSelector((state: RootState) => state.UserReducer);
    const dispatch: DispatchType = useDispatch()
    const handleCancel = () => {
        dispatch(setModalOpen(false))
        setComment(null)
    }
    const handleOk = () => {
        dispatch(setModalOpen(false))
    }
    console.log(params.id)
    // Comment
    const handleChangeComment = (e) => {
        const value = e.target.value
        setComment(value)
    }
    const updateStatusApi = async (data:UpdateStatus) => {
        const result = await http.put(`/api/Project/updateStatus`, data)
        console.log(result.data.content)
        const action = getProjectDetailApi(params.id)
        dispatch(action)
    }
    const updatePriorityApi = async (data:UpdateStatus) => {
        const result = await http.put('/api/Project/updatePriority', data)
        console.log(result.data.content)
        // const action = getProjectDetailApi(params.id)
        // dispatch(action)
    }
    const handleUpdateStatus = (value) => {
        const data = {
            taskId: Number(TaskIdDetail),
            statusId: value.toString(),
        }
        console.log(data)
        // updateStatusApi(data)

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
    // Delete Comment

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
    // Update Task
    const dataUpdateTask = useRef({
        
            listUserAsign: TaskDetail.assigness.map((member) => {
                return Number(member.id)
            }),
            taskId: TaskDetail.taskId.toString(),
            taskName: TaskDetail.taskName.toString(),
            description: TaskDetail.description.toString(),
            statusId: TaskDetail.statusId.toString(),
            originalEstimate: Number(TaskDetail.originalEstimate),
            timeTrackingSpent: Number(TaskDetail.timeTrackingSpent),
            timeTrackingRemaining: Number(TaskDetail.timeTrackingRemaining),
            projectId: Number(TaskDetail.projectId),
            typeId: Number(TaskDetail.typeId),
            priorityId: Number(params.id)
          })
    


    return (<>
        <Modal title={TaskDetail?.taskName} open={ModalOpen} onOk={handleOk} okText='Update' onCancel={handleCancel} width={980}>
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
                                <p>{ReactHtmlParser(TaskDetail?.description)}</p>


                            </div>
                            <div className="comment">
                                <p style={{ fontWeight: 'bold' }}>Comment</p>
                                <div className="block-comment d-flex mt-3">
                                    <div className="avatar">
                                        <Avatar src={userLogin?.avatar}></Avatar>
                                    </div>
                                    <Input onChange={handleChangeComment} onPressEnter={handlePressEnter} className='ms-2' placeholder="Add a comment" value={comment} />

                                </div>
                                <p className='mt-2'>
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
                                                    <p>{comment.contentComment}</p>

                                                </div>
                                                <div className="button-comment-block d-flex">
                                                    <Button type='text' icon={<EditOutlined />} style={{ border: 'none', color: 'blue' }}>

                                                    </Button>
                                                    <Button onClick={() => {
                                                        const data = {
                                                            taskId: TaskIdDetail.toString(),
                                                            commentId:comment.id
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
                                    onSelect={handleUpdateStatus}
                                    options={statusTask.map((item: Status) => {
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
                                                    const data = {
                                                        taskId: TaskIdDetail,
                                                        userId: Number(valueSelect)
                                                    }
                                                    dispatch(addUserFromTaskApi(data,params.id))
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
                                    <button className='btn' ><i className="fa fa-plus"></i> Add more</button>
                                </Popover>





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
                                        <Slider value={Number(TaskDetail.timeTrackingSpent)} min={0} max={Number(TaskDetail?.timeTrackingSpent) + Number(TaskDetail.timeTrackingRemaining)} />
                                    </div>

                                </div>
                                <div className="row mb-4">
                                    <div className="col-6 text-left">
                                        {TaskDetail?.timeTrackingSpent}h logged
                                    </div>
                                    <div className="col-6 text-end">
                                        {TaskDetail?.timeTrackingSpent}h remaining
                                    </div>


                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <Input placeholder="Timetracking" />
                                </div>
                                <div className="col-6">
                                    <Input placeholder="Timeremaining" />

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