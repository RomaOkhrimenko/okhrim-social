import {IGenre} from "./IGenre";

export interface IGame {
    image: string,
    name: string,
    slug: string,
    genres: IGenre[] | string[]
    _id: string
}