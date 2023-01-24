import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IGenre} from "../../../models/IGenre";
import {API_URL} from "../../../http";

export const genresApi = createApi({
    reducerPath: 'genres',
    baseQuery: fetchBaseQuery({baseUrl: `${API_URL}/`}),
    endpoints: (build) => ({
        getGenres: build.query<IGenre[], any>({
            query: () => `genres`
        })
    })
})

export const {useGetGenresQuery} = genresApi