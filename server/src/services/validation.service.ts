
const patterns: any = {
    namePattern: new RegExp('^[a-zA-Z]+$'),
    charNumPattern: new RegExp('^[a-zA-Z0-9_.-]*$'), 
    numberPattern: new RegExp('^[0-9]*$'),
    emailPattern: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

const patternMessages: any = {
    namePattern: "must be only letters.",
    charNumPattern: "must be only letters and numbers.",
    numberPattern: "must be only number.",
    emailPattern: "must be a valid email address."
}


export interface Validation {
    propName: string;
    minLength: number;
    maxLength: number;
    pattern?: string;
}

export interface ValidationFeedback {
    valid?: boolean;
    message?: string;
}

export class ValidationService {
    static validate(validation: Validation[], data: any): ValidationFeedback {
        let feedback: ValidationFeedback = {valid: true}
        for(let config of validation) {
            let dataPropName = data[config.propName];
            if(!dataPropName) {
                return {valid: false, message: `${config.propName} is required.`};
            } 
            if(dataPropName.length < config.minLength || dataPropName.length > config.maxLength) {
                return {valid: false, message: `${config.propName} should be at least ${config.minLength} but no longer than ${config.maxLength}`};
            }
            if(config.pattern) {
                if(!patterns[config.pattern].test(dataPropName.toLowerCase())) {
                    return { valid: false, message: `${config.propName} ${patternMessages[config.pattern]}`}
                }
            }
        }
        return feedback;
    }
}