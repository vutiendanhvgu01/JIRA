import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TaskTypeDetailById } from '../../Pages/Task/TypeTask';
import { http } from '../../util/config';
import { notifiFucntion } from '../../util/notificationCyberBug';
import { DispatchType } from '../configStore';
import { getProjectDetailApi } from './ProjectReducer';



export interface dataInsertComment {
  taskId: number | string
  contentComment: string
}

export interface typeUpdateEstimate {
  taskId:number,
  originalEstimate:number,
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
export type UpdateStatus = {
  taskId: number;
  statusId: string

}

export type UpdatePriority = {
  taskId: number;
  priorityId: string

}
export interface TypeUpdateTask {
  listUserAsign:         number[];
  taskId:                string;
  taskName:              string;
  description:           string;
  statusId:              string;
  originalEstimate:      number;
  timeTrackingSpent:     number;
  timeTrackingRemaining: number;
  projectId:             number;
  typeId:                number;
  priorityId:            number;
}


export interface TaskReducerType {
  TaskIdDetail: number
  TaskDetail: TaskTypeDetailById
  AllComment: TypeAllComment[]
  DataTaskUpdate:TypeUpdateTask
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
  DataTaskUpdate: {
    listUserAsign: [
      0
    ],
    taskId: 'string',
    taskName: 'string',
    description: 'string',
    statusId: 'string',
    originalEstimate: 0,
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
    projectId: 0,
    typeId: 0,
    priorityId: 0
  }
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
    },
    getUpdateTaskAction: (state:TaskReducerType,action:PayloadAction<TypeUpdateTask>) => {
      state.DataTaskUpdate = action.payload
    }
  }
});

export const {getUpdateTaskAction, getTaskDetailByAction, getTaskDetailIdAction,getAllCommentAction } = TaskReducer.actions

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
    const action = getAllCommentApi(data.taskId)
    dispatch(action)
    notifiFucntion("success", "Comment success");
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

export const deletedCommentApi = (data) => {
  return async(dispatch:DispatchType) => {
    const result = await http.delete(`/api/Comment/deleteComment?idComment=${data.commentId}`)
    const action = getTaskDetailByApi(data.taskId)
    console.log(result.data.content)
    dispatch(action)
    notifiFucntion("success", "Delete comment success");
  }
}
export const updateCommentApi = (id:string|number) => {
  
}

export const updateEstimateApi = (data) => {
  return async(dispatch:DispatchType) => {
    const result = await http.put('/api/Project/updateEstimate',data)
    const action = getTaskDetailByApi(data.taskId)
    console.log(result.data.content)
    dispatch(action)
  }
}
export const removeUserFromTaskApi = (data) => {
    return async(dispatch:DispatchType) => {
      const result = await http.post('/api/Project/removeUserFromTask',data)
      console.log(result.data.content)
      const action = getTaskDetailByApi(data.taskId)
      dispatch(action)
      notifiFucntion("success", "Remove user success");
    }
}
export const addUserFromTaskApi = (data,projectId) => {
  return async(dispatch:DispatchType) => {
    const result = await http.post('/api/Project/assignUserTask',data)
    console.log(result.data.content)
    const action = getTaskDetailByApi(data.taskId)
    dispatch(action)
    dispatch(getProjectDetailApi(projectId))
    notifiFucntion("success", "Add user success");
  }
}

// export const updateTimeTracking = () => {
//   return async(dispatch:DispatchType) => {
//     const result = await http.put()
//   }
// }

// export const updateTaskApi = (data:TypeUpdateTask) => {
//   return async (dispatch:DispatchType) => {
//     const result = await http.post('/api/Project/updateTask',data)
//     console.log(result.data.content)
//     // const action = getTaskDetailByApi(data.taskId)
//     // dispatch(action)
//     // dispatch(getProjectDetailApi(data.projectId))

//     console.log(result.data.content)
//   }
// }