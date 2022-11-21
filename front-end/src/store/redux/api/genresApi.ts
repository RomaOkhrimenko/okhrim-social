import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IGenre} from "../../../models/IGenre";

export const genresApi = createApi({
    reducerPath: 'genres',
    baseQuery: fetchBaseQuery({baseUrl: `${process.env.API_URL}/api/`}),
    endpoints: (build) => ({
        getGenres: build.query<IGenre[], {}>({
            query: () => `genres`
        })
    })
})

export const {useGetGenresQuery} = genresApi