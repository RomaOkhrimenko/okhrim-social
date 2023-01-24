import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IGame} from "../../../models/IGame";
import {API_URL} from "../../../http";

export const gamesApi = createApi({
    reducerPath: 'games',
    baseQuery: fetchBaseQuery({baseUrl: `${API_URL}/`}),
    endpoints: (build) => ({
        getGames: build.query<IGame[], string>({
            query: (keyword: string = '', genres: string = '') => `games?keyword=${keyword}`
        })
    })
})

export const {useGetGamesQuery} = gamesApi