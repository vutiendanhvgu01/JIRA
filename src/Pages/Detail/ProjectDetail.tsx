
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { DispatchType, RootState } from '../../redux/configStore'
import { getProjectDetailApi } from '../../redux/reducers/ProjectReducer'
import { Member, TypeProjectDetail, LstTask,LstTaskDeTail } from './TypeProjectDetail'
import { Avatar, Input, Space } from 'antd';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

type Props = {}

const ProjectDetail = (props: Props) => {
  const { Search } = Input;
  const onSearch = (value: string) => {

  };

  const dispatch: DispatchType = useDispatch()
  const { detailProjectById } = useSelector((state: RootState) => { return state.ProjectReducer })
  const param = useParams()

  useEffect(() => {
    const actionGetProject = getProjectDetailApi(param.id)
    dispatch(actionGetProject)

  }, [])
  return (
    <>
      <div className='projectDetail-container'>
        <h3>Cyber Board</h3>
        <div className="projectDetail-header">
          <h5>{detailProjectById?.projectName}</h5>
          <div className="projectDetail-wrap">
            <Search placeholder="input search text" onSearch={onSearch} style={{ width: 250, marginTop: 20 }} />
            {detailProjectById?.members?.map((member: Member) => {
              return <Avatar src={member?.avatar}>
              </Avatar>
            })}
            <button className='btn'>Only My Issue</button>
            <button className='btn'>Recently Updated</button>
          </div>

        </div>
        <div className="projectDetail-body row mt-4">
          {detailProjectById?.lstTask?.map((item: LstTask, index: number) => {
            return <div className="card-wrap col-3" key={index}>
              <div className="card backlog">
                <div className="card-header">
                  <p className='card-title'>{item?.statusName}</p>
                </div>
                <div className="card-body">
                 
                  {item?.lstTaskDeTail.map((lstTask:LstTaskDeTail)=> {
                    return <div className=' taskDetail'>{ReactHtmlParser(lstTask?.description)}</div>
                  }) }

              
               
                </div>
              </div>
            </div>
          })}


        </div>

      </div>



    </>

  )
}

export default ProjectDetail