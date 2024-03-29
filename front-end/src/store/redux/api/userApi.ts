import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUser} from "../../../models/IUser";
import {API_URL} from "../../../http";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: `${API_URL}/`}),
    endpoints: (build) => ({
        getAnotherUser: build.query<IUser, { id: string }>({
            query: ({id}) => `/user/${id}`
        }),
        getFilteredUser: build.query<IUser, { game: string; gender: string }>({
            query: ({game, gender}) => `/user?profile.gender=${gender}&profile.games=${game}`
        })
    })
})

export const {useGetAnotherUserQuery, useGetFilteredUserQuery} = userApi