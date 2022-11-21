import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const settingsAccountApi = createApi({
    reducerPath: 'settings-account',
    baseQuery: fetchBaseQuery({baseUrl: `https://okhrim-social.onrender.com/api/settings-account`}),
    endpoints: (build) => ({
        getSettingsAccount: build.query({
            query: () => `settings-account`
        })
    })
})

export const {useGetSettingsAccountQuery} = settingsAccountApi