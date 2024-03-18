export class NewJob {
    position: string = null;
    company: string = null;
    description: string = null;
    location: string = null;
    type: string = null;
    status: string = null;
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
    createdAt:string;
    updatedAt:string;
}