import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IGenre} from "../../../models/IGenre";
import {API_URL} from "../../../http";

export const platformsApi = createApi({
    reducerPath: 'platforms',
    baseQuery: fetchBaseQuery({baseUrl: `${API_URL}/`}),
    endpoints: (build) => ({
        getPlatforms: build.query<IGenre[], {}>({
            query: () => `platforms`
        })
    })
})

export const {useGetPlatformsQuery} = platformsApi