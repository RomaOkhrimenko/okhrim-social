import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const settingsAccountApi = createApi({
    reducerPath: 'settings-account',
    baseQuery: fetchBaseQuery({baseUrl: `http://localhost:4000/api/`}),
    endpoints: (build) => ({
        getSettingsAccount: build.query({
            query: () => `settings-account`
        })
    })
})

export const {useGetSettingsAccountQuery} = settingsAccountApi