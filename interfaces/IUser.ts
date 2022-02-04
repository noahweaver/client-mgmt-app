import { SchemaTimestampsConfig } from "mongoose";
import { IClient } from "./IClient";

//For user.ts model
export interface IUser extends Document, SchemaTimestampsConfig {
    username: string;
    password: string;
    comparePassword: (password: string) => Promise<Boolean>;
    // validatePassword(password: string): boolean;
}