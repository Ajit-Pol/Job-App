export interface Toaster {
    type:string;
    message:string;
}

export enum ToasterType {
    success = 'success',
    warning = 'warning'
}

export enum ToasterMessages {
    save = 'Saved successfully.',
    saveFailed = 'Save Failed.',
    delete = 'Deleted successfully.',
    errorMsg = 'Something went wrong! Please try after some time.',
    email = "Email sent successfully.",
    passwordReset = "Your password has been successfully reset. You can now log in with your new password."
}