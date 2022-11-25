import {IProfile} from "./IProfile";

export interface IUser {
    email: string,
    isActivated: boolean,
    _id: string,
    profile?: IProfile,
    newMessages: any
}