import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export class User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profilePicture: string;

    constructor(user: UserProps) {
        console.log(user);

        this.id = uuidv4();
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.profilePicture = user.profilePicture || "";
        this.setPassword(user.password);
    }

    async setPassword(password: string) {
        this.password = await bcrypt.hash(password, 10);
    }
}
