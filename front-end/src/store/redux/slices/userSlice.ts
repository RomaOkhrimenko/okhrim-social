import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../../models/IUser";
import {RootState} from "../index";

interface IInitialState {
    user: IUser,
    isAuth: boolean,
    isLoading: boolean
}

const initialState: IInitialState = {
    user: {} as IUser,
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
            if (state.user.newMessages[payload]) {
                state.user.newMessages[payload] = state.user.newMessages[payload] + 1;
            } else {
                state.user.newMessages[payload] = 1;
            }
        },
        resetNotifications: (state, {payload}) => {
            delete state.user.newMessages[payload]
        }
    }
})

export const {setAuth, setUser, setLoading, addNotifications, resetNotifications} = userSlice.actions
export const userReducer = userSlice.reducer