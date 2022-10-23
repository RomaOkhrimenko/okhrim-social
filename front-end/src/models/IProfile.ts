import {IUser} from "./IUser";
import {IGame} from "./IGame";

export interface IProfile {
    username: string
    description: string
    birthday: string
    friends: IUser[]
    platforms: string[]
    games: IGame[]
    genres: string[]
    isComplete: boolean
}