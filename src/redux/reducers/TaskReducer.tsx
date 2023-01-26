import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TaskTypeDetailById } from '../../Pages/Task/TypeTask';
import { http } from '../../util/config';
import { DispatchType } from '../configStore';



export interface dataInsertComment {
  taskId: number | string
  contentComment: string
}


export interface TypeAllComment {
  user: UserComment;
  id: number;
  userId: number;
  taskId: number;
  contentComment: string;
  deleted: boolean;
  alias: string;
}

export interface UserComment {
  userId: number;
  name: string;
  avatar: string;
}


export interface TaskReducerType {
  TaskIdDetail: number
  TaskDetail: TaskTypeDetailById
  AllComment: TypeAllComment[]
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
  },
  AllComment: [{
    "user": {
      "userId": 3949,
      "name": "Bao Toan3 ",
      "avatar": "https://ui-avatars.com/api/?name=Bao Toan3 "
    },
    "id": 7360,
    "userId": 3949,
    "taskId": 8230,
    "contentComment": "string",
    "deleted": false,
    "alias": "string"
  }],
}

const TaskReducer = createSlice({
  name: 'TaskReducer',
  initialState,
  reducers: {
    getTaskDetailIdAction: (state: TaskReducerType, action: PayloadAction<number>) => {
      state.TaskIdDetail = action.payload
    },
    getTaskDetailByAction: (state: TaskReducerType, action: PayloadAction<TaskTypeDetailById>) => {
      state.TaskDetail = action.payload
    },
    getAllCommentAction: (state:TaskReducerType,action:PayloadAction<TypeAllComment[]>) => {
      state.AllComment = action.payload
    }
  }
});

export const { getTaskDetailByAction, getTaskDetailIdAction,getAllCommentAction } = TaskReducer.actions

export default TaskReducer.reducer

export const getTaskDetailByApi = (id: string | number) => {
  return async (dispatch: DispatchType) => {
    const result = await http.get(`/api/Project/getTaskDetail?taskId=${id}`)
    console.log(result.data.content)
    const action = getTaskDetailByAction(result.data.content)
    dispatch(action)
    const actionGetAllComment = getAllCommentApi(id)
    dispatch(actionGetAllComment)
  }
}
export const insertComment = (data: dataInsertComment) => {
  return async (dispatch: DispatchType) => {
    const result = await http.post('/api/Comment/insertComment', data)
    console.log(result.data.content)

  }
}
export const getAllCommentApi = (id:string|number) => {
  return async (dispatch:DispatchType) => {
    const result = await http.get(`/api/Comment/getAll?taskId=${id}`)
    console.log(result.data.content)
    const action = getAllCommentAction(result.data.content)
    dispatch(action)
  }
}