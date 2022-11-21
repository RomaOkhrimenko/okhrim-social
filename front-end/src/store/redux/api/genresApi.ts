import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IGenre} from "../../../models/IGenre";

export const genresApi = createApi({
    reducerPath: 'genres',
    baseQuery: fetchBaseQuery({baseUrl: `https://okhrim-social.onrender.com//api/`}),
    endpoints: (build) => ({
        getGenres: build.query<IGenre[], {}>({
            query: () => `genres`
        })
    })
})

export const {useGetGenresQuery} = genresApi