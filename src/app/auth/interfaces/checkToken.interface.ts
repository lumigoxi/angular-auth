import { User } from "./user.interface";

export interface CkeckTokenResponse {
    user:  User;
    token: string;
}
