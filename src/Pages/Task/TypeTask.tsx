import React from 'react'

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