import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TaskTypeDetailById } from '../../Pages/Task/TypeTask';
import { http } from '../../util/config';
import { DispatchType } from '../configStore';


export interface TaskReducerType {
    TaskIdDetail:number
    TaskDetail: TaskTypeDetailById
}

const initialState = {
    TaskIdDetail: 8223,
    TaskDetail: {
        "priorityTask": {
          "priorityId": 2,
          "priority": "Medium"
        },
        "taskTypeDetail": {
          "id": 2,
          "taskType": "new task"
        },
        "assigness": [
          {
            "id": 3943,
            "avatar": "https://ui-avatars.com/api/?name=danh",
            "name": "danh",
            "alias": "danh"
          }
        ],
        "lstComment": [],
        "taskId": 8228,
        "taskName": "123",
        "alias": "123",
        "description": "<p>123</p>",
        "statusId": "2",
        "originalEstimate": 10,
        "timeTrackingSpent": 10,
        "timeTrackingRemaining": 8,
        "typeId": 2,
        "priorityId": 2,
        "projectId": 10644
      }
}

const TaskReducer = createSlice({
  name: 'TaskReducer',
  initialState,
  reducers: {
    getTaskDetailIdAction :(state:TaskReducerType,action:PayloadAction<number>) => {
        state.TaskIdDetail = action.payload
    },
    getTaskDetailByAction: (state:TaskReducerType,action:PayloadAction<TaskTypeDetailById>) => {
        state.TaskDetail = action.payload
    }
  }
});

export const {getTaskDetailByAction, getTaskDetailIdAction } = TaskReducer.actions

export default TaskReducer.reducer

export const getTaskDetailByApi = (id:string | number) => {
    return async (dispatch:DispatchType) => {
        const result = await http.get(`/api/Project/getTaskDetail?taskId=${id}`)
        console.log(result.data.content)
        const action = getTaskDetailByAction(result.data.content)
        dispatch(action)
    }   
}