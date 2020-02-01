import bcrypt from 'bcryptjs';

export class BcryptService {
    constructor() {}
    static async hashPassword(password: string): Promise<string> {
        try {
            if(!password) throw new Error("No password was provided.");
            let salt = await bcrypt.genSalt(10);
            let hashedPassword: string = await bcrypt.hash(password, salt);
            return hashedPassword;
        } catch (error) {
            throw error;
        }
    }
    
    static async comparePasswords(
        password: string, 
        hashedPassword: string
    ): Promise<boolean> {
        try {
            if(!password || !hashedPassword) throw new Error("Password or hashed password is missing.");
            let isMatched: boolean = await bcrypt.compareSync(password, hashedPassword);
            return isMatched; 
        } catch (error) {
            throw error;
        }
    }
}
