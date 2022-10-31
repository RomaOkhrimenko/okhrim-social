import {IUser} from "./IUser";

export interface IFriends {
    incomeRequests: {
        username: string,
        image: string,
        id: string
    }[]
    outcomeRequests: {
        username: string,
        image: string,
        id: string
    }[]
    friends: {
        username: string,
        image: string,
        id: string
    }[]
}