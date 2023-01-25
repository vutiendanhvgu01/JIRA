import React from 'react'
import { Assigness, TaskTypeDetail } from '../Detail/TypeProjectDetail';

export interface TypeTask {
    id:string,
    taskType:string
}

export interface Status {
   statusId:string,
   statusName:string,
   alias:string,
   deleted:string | Boolean
}

export interface PriorityTask {
    priorityId:  number;
    priority:    string;
    description: string;
    deleted:     boolean | string;
    alias:       string;
}
export interface TaskTypeDetailById {
    priorityTask:          PriorityTask;
    taskTypeDetail:        TaskTypeDetail;
    assigness:             Assigness[];
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