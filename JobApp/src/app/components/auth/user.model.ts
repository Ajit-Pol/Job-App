export class Login {
    email:string = '';
    password:string ='';
}

export class Register {
    name:string = '';
    email:string = '';
    location:string = '';
    password:string ='';
}

export interface AuthInfo  {
    success:boolean;
    user:{name:string, role:string, profileId:string};
}

export class Regex {
    public static email = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    public static opt = new RegExp(/^\d{4}$/);
    public static password = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
}

export enum ValidationMessages {
    email = 'Please enter a valid email address.',
    password = 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.',
    required = 'This field is required.',
    minLength = 'Minimum $ characters are required for this field.'
}