export type TypeProjectDetail  ={
    lstTask: LstTask[];
    members: Member[];
    creator: Creator;
    id: number;
    projectName: string;
    description: string;
    projectCategory: Creator;
    alias: string;
}

export type Creator = {
    id: number;
    name: string;
}

export type LstTask = {
    lstTaskDeTail: LstTaskDeTail[];
    statusId: string;
    statusName: string;
    alias: string;
}

export type LstTaskDeTail =  {
    priorityTask: PriorityTask;
    taskTypeDetail: TaskTypeDetail;
    assigness: Assigness[];
    lstComment: any[];
    taskId: number;
    taskName: string;
    alias: string;
    description: string;
    statusId: string;
    originalEstimate: number;
    timeTrackingSpent: number;
    timeTrackingRemaining: number;
    typeId: number;
    priorityId: number;
    projectId: number;
}
export type TaskTypeDetail  = {
    id: number;
    taskType: string;
  }
  
  export type Member  = {
    userId: number;
    name: string;
    avatar: string;
    email: string;
    phoneNumber: string;
  }
    

export type Assigness =  {
    id: number;
    avatar: string;
    name: string;
    alias: string;
}

export type PriorityTask =  {
    priorityId: number;
    priority: string;
}

