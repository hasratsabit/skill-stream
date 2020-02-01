import { Validation } from "../../services/validation.service";

export const userValidation: Validation[] = [
    {
        propName: "firstName", 
        minLength: 2, 
        maxLength: 30, 
        pattern: "namePattern"
    },
    {
        propName: "lastName", 
        minLength: 2, 
        maxLength: 30, 
        pattern: "namePattern"
    },
    {
        propName: "username", 
        minLength: 5, 
        maxLength: 30, 
        pattern: "charNumPattern"
    },
    {
        propName: "email",
        minLength: 1, 
        maxLength: 30, 
        pattern: "emailPattern"
    },
    {
        propName: "password",
        minLength: 1, 
        maxLength: 30
    }
];