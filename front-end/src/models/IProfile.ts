import {IUser} from "./IUser";
import {IGame} from "./IGame";
import {IPlatform} from "./IPlatform";
import {IGenre} from "./IGenre";
import {IFriends} from "./IFriends";

export interface IProfile {
    username: string
    description: string
    birthday: string
    friends: IFriends
    platforms: IPlatform[]
    games: IGame[]
    genres: IGenre[]
    isComplete: boolean
    image: string
}