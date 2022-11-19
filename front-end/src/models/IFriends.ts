import {IUser} from "./IUser";

export interface IFriendBlock {
    profile: {
        image?: {
            url: string,
            public_id: string
        }
        username: string
    }
    _id: string
}

export interface IFriends {
    incomeRequests: IFriendBlock[]
    outcomeRequests: IFriendBlock[]
    friends: IFriendBlock[]
}