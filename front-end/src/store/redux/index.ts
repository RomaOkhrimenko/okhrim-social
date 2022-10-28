import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {
    persistStore, persistReducer,
    FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {userReducer} from "./slices/userSlice";
import {settingsAccountApi, gamesApi} from "./api";

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: []
}

const rootReducer = combineReducers({
    user: userReducer,
    [settingsAccountApi.reducerPath]: settingsAccountApi.reducer,
    [gamesApi.reducerPath]: gamesApi.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const setupStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }).concat(settingsAccountApi.middleware, gamesApi.middleware),
    })
}

export const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export const persist = persistStore(store)