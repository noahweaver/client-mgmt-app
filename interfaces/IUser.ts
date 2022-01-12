import { IClient } from "./IClient";

//For user.ts model
export interface IUser extends Document {
    username: string;
    password: string;
    comparePassword: (password: string) => Promise<Boolean>;
    // validatePassword(password: string): boolean;
}