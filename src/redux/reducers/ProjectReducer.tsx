import { createSlice } from "@reduxjs/toolkit";

import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { PriorityTask, Status, TypeTask } from "../../Pages/Task/TypeTask";
import {
  TOKEN_CYBERSOFT,
  ACCESS_TOKEN,
  getStore,
  http,
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
}

const initialState = {
  categoryProject: [],
  createProject: null,
  allProjects: [],
  statusTask: [],
  taskType: [],
  Priority: [],
  projectDetail: [],
  projectEdit: {
    id: 0,
    projectName: "string",

    description: "string",
    categoryId: "2",
  },
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
    getProjectDetailAction: (
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
  },
});

export const {
  projectCategoryAction,
  getAllProjects,
  getStatusTaskAction,
  getTaskTypeAction,
  getTaskPriorityAction,
  getProjectDetailAction,
  getProjectEditAction,
} = ProjectReducer.actions;

export default ProjectReducer.reducer;

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
export const getProjectDetailAPI = () => {
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
      getProjectDetailAction(content);
    dispatch(action);
  };
};
export const createProjectAPI = (createProject: Project) => {
  return async () => {
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
    const action = getProjectDetailAPI();

    dispatch(action);
    notifiFucntion("success", "Update project success");
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
    const action = getProjectDetailAPI();

    dispatch(action);
    notifiFucntion("success", "Delete project success");
  };
};
