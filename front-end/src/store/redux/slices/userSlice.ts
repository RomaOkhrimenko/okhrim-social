import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../../models/IUser";
import {RootState} from "../index";

interface IInitialState {
    user: IUser,
    newMessages: any
    isAuth: boolean,
    isLoading: boolean
}

const initialState: IInitialState = {
    user: {} as IUser,
    newMessages: {},
    isAuth: false,
    isLoading: false
}

const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setAuth: (state: IInitialState, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },

        setUser(state: IInitialState, action: PayloadAction<IUser>) {
            state.user = action.payload
        },

        setLoading(state: IInitialState, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },

        addNotifications: (state, {payload}) => {
            if (state.newMessages[payload]) {
                state.newMessages[payload] = state.newMessages[payload] + 1;
            } else {
                state.newMessages[payload] = 1;
            }
        },
        resetNotifications: (state, {payload}) => {
            delete state.newMessages[payload]
        }
    }
})

export const {setAuth, setUser, setLoading, addNotifications, resetNotifications} = userSlice.actions
export const userReducer = userSlice.reducer