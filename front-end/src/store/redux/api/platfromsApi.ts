import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IGenre} from "../../../models/IGenre";

export const platformsApi = createApi({
    reducerPath: 'platforms',
    baseQuery: fetchBaseQuery({baseUrl: `http://localhost:4000/api/`}),
    endpoints: (build) => ({
        getPlatforms: build.query<IGenre[], {}>({
            query: () => `platforms`
        })
    })
})

export const {useGetPlatformsQuery} = platformsApi