import {AppDispatch} from "../index";
import AuthService from "../../../services/AuthService";
import {setAuth, setLoading, setUser} from "../slices/userSlice";
import {IUser} from "../../../models/IUser";
import axios from "axios";
import {AuthResponse} from "../../../models/response/AuthResponse";

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.login(email, password);

        localStorage.setItem('token', response.data.accessToken)
        dispatch(setAuth(true))
        dispatch(setUser(response.data.user))
    } catch (e: any) {
        alert(e.response?.data?.message)
    }
}

export const registration = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.registration(email, password);
        localStorage.setItem('token', response.data.accessToken)
        dispatch(setAuth(true))
        dispatch(setUser(response.data.user))
    } catch (e: any) {
        alert(e.response?.data?.message)
    }
}

export const logout = () => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.logout();
        localStorage.removeItem('token')
        dispatch(setAuth(false))
        dispatch(setUser({} as IUser))
    } catch (e: any) {
        alert(e.response?.data?.message)
    }
}

export const checkAuth = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true))
    try {
        const response = await axios.get<AuthResponse>('http://localhost:4000/api/refresh', {withCredentials: true})
        console.log(response)
        localStorage.setItem('token', response.data.accessToken)
        dispatch(setAuth(true))
        dispatch(setUser(response.data.user))
    } catch (e: any) {
        alert(e.response?.data?.message)
        console.log(e)
    } finally {
        dispatch(setLoading(false))
    }
}