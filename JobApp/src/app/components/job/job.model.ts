export class NewJob {
    position: string = null;
    company: string = null;
    description: string = null;
    location: string = null;
    type: string = null;
    status: string = null;
    vacancy:number = null;
    exprience:number = null;
    requirement:string = null;
}

export interface JobDetails {
    _id:string;
    createdBy:string;
    position: string;
    company: string;
    description: string;
    location: string;
    type: string;
    status: string;
    vacancy:number;
    exprience:number;
    requirement:string;
    createdAt:string;
    updatedAt:string;
}