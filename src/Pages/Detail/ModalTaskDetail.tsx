import { Avatar, Input, Modal, Select, Slider } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/configStore'
import { setModalOpen } from '../../redux/reducers/UserReducer'
import ReactHtmlParser, {
    processNodes,
    convertNodeToElement,
    htmlparser2,
} from "react-html-parser";
import { Assigness } from './TypeProjectDetail'
import { PriorityTask, Status, TypeTask } from '../Task/TypeTask'
import { insertComment, TypeAllComment } from '../../redux/reducers/TaskReducer'
import { CreateTypeTask, getTaskPriority, getTaskStatus, getTaskType } from '../../redux/reducers/ProjectReducer'
type Props = {}

const ModalTaskDetail = (props: Props) => {
    const { ModalOpen, userLogin } = useSelector((state: RootState) => { return state.UserReducer })
    const { TaskDetail, TaskIdDetail,AllComment } = useSelector((state: RootState) => { return state.TaskReducer })
    const { statusTask, taskType, Priority } = useSelector((state: RootState) => {
        return state.ProjectReducer
    })
    const [comment, setComment] = useState()
    const dispatch: DispatchType = useDispatch()
    const handleCancel = () => {
        dispatch(setModalOpen(false))
        setComment(null)
    }
    const handleOk = () => {
        dispatch(setModalOpen(false))
    }
    // Comment
    const handleChangeComment = (e) => {
        const value = e.target.value
        setComment(value)
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

    return (<>
        <Modal title={TaskDetail.taskName} open={ModalOpen} onOk={handleOk} okText='Update' onCancel={handleCancel} width={980}>
            <div className="modal-header">
                <div className="task-title">
                    <i className="fa fa-bookmark"></i>
                    <span> {TaskDetail.taskName}</span>
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
                            <p className="issue">Hello</p>
                            <div className="description">
                                <p style={{ fontWeight: 'bold' }}>Description</p>
                                <p>{ReactHtmlParser(TaskDetail?.description)}</p>

                            </div>
                            <div className="comment">
                                <h5>Comment</h5>
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
                                <div className="comment-item row">
                                    <div className="display-comment col-1">
                                        <Avatar src={userLogin?.avatar}></Avatar>
                                    </div>
                                    <div className='col-11'>
                                        {AllComment?.map((comment:TypeAllComment) => {
                                            return   <div className="comment-item">
                                            <p className='mb-2'>{comment.user.name}  <span>a month ago</span></p>
                                            <p>{comment.contentComment}</p>
                                            </div>
                                        })}
                                      
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="status-block mb-3">
                                <h6>STATUS</h6>
                                <Select
                                    value={TaskDetail?.statusId}
                                    style={{ width: '100%' }}

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
                                <ul className='d-flex row'  style={{listStyle:'none'}}>
                                    {TaskDetail.assigness?.map((item: Assigness) => {
                                        return <li className="assignees-member mr-2  col-5" >
                                            <div className='p-2' style={{ background: 'grey' }}><Avatar src={item.avatar} />
                                                {item.name}
                                            </div>

                                        </li>
                                    })}

                                </ul>

                                <button className='btn'><i className="fa fa-plus"></i> Add more</button>

                            </div>
                            <div className="priority-block mb-3">
                                <h6>PRIORITY</h6>
                                <Select
                                    defaultValue={TaskDetail?.priorityTask.priority}
                                    style={{ width: '100%' }}

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
                                <Input disabled={true} value={TaskDetail.originalEstimate} />

                            </div>
                            <div className="time-tracking">
                                <h6>TIME TRACKING</h6>
                                <div className="row">
                                    <div className="col-1" style={{ marginTop: '5px' }}>
                                        <i className="fa fa-clock"></i>
                                    </div>
                                    <div className="col-11">
                                        <Slider value={Number(TaskDetail.timeTrackingSpent)} min={0} max={Number(TaskDetail.timeTrackingSpent) + Number(TaskDetail.timeTrackingRemaining)} />
                                    </div>

                                </div>

                                <div className="row mb-4">
                                    <div className="col-6 text-left">
                                        {TaskDetail.timeTrackingSpent}h logged
                                    </div>
                                    <div className="col-6 text-end">
                                        {TaskDetail.timeTrackingSpent}h remaining
                                    </div>
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