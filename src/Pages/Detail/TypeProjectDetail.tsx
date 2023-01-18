export interface TypeProjectDetail {
    lstTask:         ListTask[];
    members:         Member[];
    creator:         Creator;
    id:              number;
    projectName:     string;
    description:     string;
    projectCategory: projectCategory;
    alias:           string;
}

export interface projectCategory{
    id:number;
    name:string;

}
export interface Creator {
    id:   number;
    name: string;
}
export interface ListTask {
    lstTaskDeTail: LstTaskDeTail[]; 
    statusId:      string;
    statusName:    string;
    alias:         string;
}
export interface LstTaskDeTail {
    priorityTask:          PriorityTask;
    taskTypeDetail:        TaskTypeDetail;
    assigness:             any[];
    lstComment:            any[];
    taskId:                number;
    taskName:              string;
    alias:                 string;
    description:           string;
    statusId:              string;
    originalEstimate:      number;
    timeTrackingSpent:     number;
    timeTrackingRemaining: number;
    typeId:                number;
    priorityId:            number;
    projectId:             number;
}
export interface PriorityTask {
    priorityId: number;
    priority:   string;
}
export interface TaskTypeDetail {
    id:       number;
    taskType: string;
}
export interface Member {
    userId:      number;
    name:        string;
    avatar:      string;
    email:       string;
    phoneNumber: string;
}
