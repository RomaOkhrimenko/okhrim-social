import {IProfile} from "./IProfile";

export interface IUser {
    email: string,
    isActivated: boolean,
    id: string,
    profile?: IProfile
}