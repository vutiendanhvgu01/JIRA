import { Avatar, Input, Modal } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/configStore'
import { setModalOpen } from '../../redux/reducers/UserReducer'
import ReactHtmlParser, {
    processNodes,
    convertNodeToElement,
    htmlparser2,
} from "react-html-parser";
type Props = {}

const ModalTaskDetail = (props: Props) => {
    const { ModalOpen, userLogin } = useSelector((state: RootState) => { return state.UserReducer })
    const { TaskDetail, TaskIdDetail } = useSelector((state: RootState) => { return state.TaskReducer })
    const dispatch: DispatchType = useDispatch()
    const handleCancel = () => {
        dispatch(setModalOpen(false))

    }
    const handleOk = () => {
        dispatch(setModalOpen(false))

    }
    return (<>
        <Modal title={TaskDetail.taskName} open={ModalOpen} onOk={handleOk} okText='Update' onCancel={handleCancel} width={1200}>
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
            <div className="modal-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-8">
                            <p className="issue">Hello</p>
                            <div className="description">
                                <p style={{fontWeight:'bold'}}>Description</p>
                                <p>{ReactHtmlParser(TaskDetail.description)}</p>

                            </div>
                            <div className="comment">
                                <h5>Comment</h5>
                                <div className="block-comment d-flex mt-3">
                                    <div className="avatar">
                                        <Avatar src={userLogin.avatar}></Avatar>
                                    </div>
                                    <Input className='ms-2' placeholder="Add a comment" />

                                </div>
                                <p className='mt-2'>
                                    <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                                    <span> press <span style={{ fontWeight: 'bold', color: '#b4ac6' }}>M </span>to comment</span>
                                </p>
                            </div>
                            <div className="lastest-comment">
                                <div className="comment-item row">
                                    <div className="display-comment col-1">
                                        <Avatar src={userLogin.avatar}></Avatar>
                                    </div>
                                    <div className='col-11'>
                                        <p className='mb-2'>Name  <span>a month ago</span></p>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum soluta dolor fugiat dolore nulla vel, atque eaque error ex voluptatibus quas quam totam! Magnam assumenda tempora perspiciatis, temporibus nam cum?</p>
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