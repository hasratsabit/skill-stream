import { UserService, UserServiceSingleton } from "../user/user.service";



export class AuthService {
    private userService: UserService
    constructor() {
        this.userService = UserServiceSingleton.getInstance();
    }

    login() {

    }
}