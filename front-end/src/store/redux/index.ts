import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {
    persistStore, persistReducer,
    FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {userReducer} from "./slices/userSlice";
import {settingsAccountApi, gamesApi, userApi} from "./api";
import {gameReducer} from "./slices/gameSlice";
import {genresApi} from "./api/genresApi";
import {platformsApi} from "./api/platfromsApi";

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: []
}

const rootReducer = combineReducers({
    user: userReducer,
    game: gameReducer,
    [genresApi.reducerPath]: genresApi.reducer,
    [platformsApi.reducerPath]: platformsApi.reducer,
    [settingsAccountApi.reducerPath]: settingsAccountApi.reducer,
    [gamesApi.reducerPath]: gamesApi.reducer,
    [userApi.reducerPath]: userApi.reducer
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
            }).concat(settingsAccountApi.middleware, gamesApi.middleware,
                userApi.middleware, genresApi.middleware, platformsApi.middleware),
    })
}

export const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export const persist = persistStore(store)