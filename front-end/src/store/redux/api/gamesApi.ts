import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IGame} from "../../../models/IGame";

export const gamesApi = createApi({
    reducerPath: 'games',
    baseQuery: fetchBaseQuery({baseUrl: `${process.env.API_URL}/api/`}),
    endpoints: (build) => ({
        getGames: build.query<IGame[], string>({
            query: (keyword: string = '', genres: string = '') => `games?keyword=${keyword}`
        })
    })
})

export const {useGetGamesQuery} = gamesApi