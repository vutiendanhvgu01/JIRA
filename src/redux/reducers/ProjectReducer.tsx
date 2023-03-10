import { createSlice } from "@reduxjs/toolkit";

import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { history } from "../..";
import { TypeProjectDetail } from "../../Pages/Detail/TypeProjectDetail";
import { PriorityTask, Status, TypeTask } from "../../Pages/Task/TypeTask";
import {
  TOKEN_CYBERSOFT,
  ACCESS_TOKEN,
  getStore,
  http,
  catchErro,
} from "../../util/config";
import { notifiFucntion } from "../../util/notificationCyberBug";
import { DispatchType, RootState } from "../configStore";

export interface category {
  id: number;
  projectCategoryName: string;
}

export interface projectAll {
  members: any[];
  creator: Creator;
  id: number;
  projectName: string;
  description: string;
  categoryId: number;
  categoryName: string;
  alias: string;
  deleted: boolean;
}

export interface Creator {
  id: number;
  name: string;
}

export interface Project {
  projectName: string;
  description: string;
  categoryId: number;
}
export interface ProjectDetail {
  members: [];
  creator: {
    id: number;
    name: string;
  };
  id: number;
  projectName: string;
  description: string;
  categoryId: number;
  categoryName: string;
  alias: string;
  deleted: boolean;
}
export interface ProjectEdit {
  id: number;
  projectName: string;

  description: string;
  categoryId: any;
}
export interface ProjectState {
  categoryProject: category[];
  createProject: Project;
  allProjects: projectAll[];
  statusTask: Status[];
  taskType: TypeTask[];
  Priority: PriorityTask[];
  projectDetail: ProjectDetail[];
  projectEdit: ProjectEdit;
  detailProjectById: TypeProjectDetail;
}
export interface CreateTypeTask {
  listUserAsign?: number[];
  taskName?: string;
  description?: string;
  statusId?: string;
  originalEstimate?: number;
  timeTrackingSpent?: number;
  timeTrackingRemaining?: number;
  projectId?: number;
  typeId?: number | string;
  priorityId?: number;
  createTask?: CreateTypeTask;
}

const initialState = {
  categoryProject: [],
  createProject: null,
  allProjects: null,
  statusTask: null,
  taskType: null,
  Priority: null,
  projectDetail: [],
  projectEdit: {
    id: 0,
    projectName: "string",

    description: "string",
    categoryId: "2",
  },
  detailProjectById: null,
  createTask: null,
};

const ProjectReducer = createSlice({
  name: "projectReducer",
  initialState,
  reducers: {
    projectCategoryAction: (
      state: ProjectState,
      action: PayloadAction<category[]>
    ) => {
      state.categoryProject = action.payload;
    },
    getAllProjects: (
      state: ProjectState,
      action: PayloadAction<projectAll[]>
    ) => {
      state.allProjects = action.payload;
    },
    getStatusTaskAction: (
      state: ProjectState,
      action: PayloadAction<Status[]>
    ) => {
      state.statusTask = action.payload;
    },
    getTaskTypeAction: (
      state: ProjectState,
      action: PayloadAction<TypeTask[]>
    ) => {
      state.taskType = action.payload;
    },
    getTaskPriorityAction: (
      state: ProjectState,
      action: PayloadAction<PriorityTask[]>
    ) => {
      state.Priority = action.payload;
    },
    getAllProjectAPIAction: (
      state: ProjectState,
      action: PayloadAction<ProjectDetail[]>
    ) => {
      state.projectDetail = action.payload;
    },
    getProjectEditAction: (
      state: ProjectState,
      action: PayloadAction<ProjectEdit>
    ) => {
      state.projectEdit = action.payload;
    },
    getDetailProjectById: (
      state: ProjectState,
      action: PayloadAction<TypeProjectDetail>
    ) => {
      state.detailProjectById = action.payload;
    },
  },
});

export const {
  projectCategoryAction,
  getAllProjects,
  getStatusTaskAction,
  getTaskTypeAction,
  getTaskPriorityAction,
  getAllProjectAPIAction,
  getProjectEditAction,
  getDetailProjectById,
} = ProjectReducer.actions;

export default ProjectReducer.reducer;
export const createTaskApi = (data: CreateTypeTask) => {
  return async () => {
    try {
      const result = await axios({
        url: "https://jiranew.cybersoft.edu.vn/api/Project/createTask",
        method: "post",
        data: data,
        headers: {
          TokenCybersoft: TOKEN_CYBERSOFT,
          Authorization: `Bearer ${getStore(ACCESS_TOKEN)}`,
        },
      });
      console.log(result.data.content);
      notifiFucntion("success", "Create task success");

      console.log(result.data.statusCode);
      history.push(`/home/projectdetail/${data.projectId}`);
    } catch (err) {
      // console.log(err);
      // alert("Quy???n truy c???p kh??ng h???p l??? !");
      notifiFucntion("error", "Quy???n truy c???p kh??ng h???p l??? !");
    }
  };
};
export const getProjectCategoryApi = () => {
  return async (dispatch: DispatchType) => {
    const result = await axios({
      url: "https://jiranew.cybersoft.edu.vn/api/ProjectCategory",
      method: "get",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
    const content: category[] = result.data.content;
    const action: PayloadAction<category[]> = projectCategoryAction(content);
    dispatch(action);
  };
};
export const getAllProjectAPI = () => {
  return async (dispatch: DispatchType) => {
    const result = await axios({
      url: `https://jiranew.cybersoft.edu.vn/api/Project/getAllProject`,
      method: "get",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
    console.log(result.data.content);
    const content: ProjectDetail[] = result.data.content;
    const action: PayloadAction<ProjectDetail[]> =
      getAllProjectAPIAction(content);
    dispatch(action);
  };
};
export const createProjectAPI = (createProject: Project) => {
  return async () => {
    try {
      const result = await axios({
        url: "https://jiranew.cybersoft.edu.vn/api/Project/createProjectAuthorize",
        method: "post",
        data: createProject,
        headers: {
          TokenCybersoft: TOKEN_CYBERSOFT,
          Authorization: `Bearer ${getStore(ACCESS_TOKEN)}`,
        },
      });
      console.log(result.data.content);
      notifiFucntion("success", "Create project success");
    } catch (err) {
      notifiFucntion("error", "Tr??ng t??n project");
    }
  };
};

export const getAllProject = () => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await axios({
        url: "https://jiranew.cybersoft.edu.vn/api/Project/getAllProject",
        method: "get",
        headers: {
          TokenCybersoft: TOKEN_CYBERSOFT,
        },
      });
      console.log("getallproject", result.data.content);
      const action = getAllProjects(result.data.content);
      dispatch(action);
      const actionGetStatusTask = getTaskStatus();
      dispatch(actionGetStatusTask);
      const actionGetTypeTask = getTaskType();
      dispatch(actionGetTypeTask);
      const actionGetPriorityTask = getTaskPriority();
      dispatch(actionGetPriorityTask);
    } catch (err) {
      console.log(err);
    }
  };
};
export const getTaskStatus = () => {
  return async (dispatch: DispatchType) => {
    const result = await axios({
      url: "https://jiranew.cybersoft.edu.vn/api/Status/getAll",
      method: "get",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
    console.log(result.data.content);
    const action = getStatusTaskAction(result.data.content);
    dispatch(action);
  };
};

export const getTaskType = () => {
  return async (dispatch: DispatchType) => {
    const result = await http.get("/api/TaskType/getAll");
    console.log(result.data.content);
    const action = getTaskTypeAction(result.data.content);
    dispatch(action);
  };
};

export const getTaskPriority = () => {
  return async (dispatch: DispatchType) => {
    const result = await http.get("/api/Priority/getAll");
    console.log(result.data.content);
    const action = getTaskPriorityAction(result.data.content);
    dispatch(action);
  };
};
export const updateProjectAPI = (projectUpdate: ProjectEdit) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await axios({
        url: `https://jiranew.cybersoft.edu.vn/api/Project/updateProject?projectId=${projectUpdate.id}`,
        method: "put",
        data: projectUpdate,
        headers: {
          TokenCybersoft: TOKEN_CYBERSOFT,
          Authorization: `Bearer ${getStore(ACCESS_TOKEN)}`,
        },
      });
      console.log(result.data.content);
      const action = getAllProjectAPI();
      dispatch({
        type: "CLOSE_DRAWER",
      });
      dispatch(action);
      notifiFucntion("success", "Update project success");
    } catch (err) {
      notifiFucntion("error", "Update project fail");
    }
  };
};
export const deleteProjectAPI = (projectUpdate: number) => {
  return async (dispatch: DispatchType) => {
    const result = await axios({
      url: `https://jiranew.cybersoft.edu.vn/api/Project/deleteProject?projectId=${projectUpdate}`,
      method: "delete",

      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: `Bearer ${getStore(ACCESS_TOKEN)}`,
      },
    });
    console.log(result.data.content);
    const action = getAllProjectAPI();
    dispatch(action);
    notifiFucntion("success", "Delete project success");
  };
};
export const getProjectDetailApi = (id: string | number) => {
  return async (dispatch: DispatchType) => {
    const result = await http.get(
      `https://jiranew.cybersoft.edu.vn/api/Project/getProjectDetail?id=${id}`
    );
    console.log(result.data.content);
    const action = getDetailProjectById(result.data.content);
    dispatch(action);
  };
};
