import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_URL} from "../../../http";

export const settingsAccountApi = createApi({
    reducerPath: 'settings-account',
    baseQuery: fetchBaseQuery({baseUrl: `${API_URL}/`}),
    endpoints: (build) => ({
        getSettingsAccount: build.query({
            query: () => `settings-account`
        })
    })
})

export const {useGetSettingsAccountQuery} = settingsAccountApi