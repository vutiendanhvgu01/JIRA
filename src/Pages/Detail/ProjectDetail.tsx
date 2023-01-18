
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { DispatchType, RootState } from '../../redux/configStore'
import { getProjectDetailApi } from '../../redux/reducers/ProjectReducer'
import { Member, TypeProjectDetail } from './TypeProjectDetail'
import { Avatar, Input, Space } from 'antd';


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
          {detailProjectById.members?.map((member:Member) => {
              return <Avatar  src={member?.avatar}>
            
               </Avatar>
          })}
          
      
          <button className='btn'>Only My Issue</button>
          <button className='btn'>Recently Updated</button>
          </div>
          
        </div>
        <div className="projectDetail-body row mt-4">
          <div className="card-wrap col-3">
            <div className="card backlog">

              <div className="card-header">
                <p className='card-title'>BACK LOG</p>
              </div>
              <div className="card-body"></div>
            </div>

          </div>
          <div className="card-wrap col-3">
            <div className="card selectfordev">

              <div className="card-header">
                <p className='card-title'>SELECTED FOR DEVLOPMENT</p>
              </div>
              <div className="card-body"></div>
            </div>

          </div>
          <div className="card-wrap col-3">
            <div className="card inprogess">

              <div className="card-header">
                <p className='card-title'>IN PROGESS</p>
              </div>
              <div className="card-body"></div>
            </div>

          </div>
          <div className="card-wrap col-3">
            <div className="card done">

              <div className="card-header">
                <p className='card-title'>DONE</p>
              </div>
              <div className="card-body"></div>
            </div>

          </div>


        </div>

      </div>

    </>

  )
}

export default ProjectDetail