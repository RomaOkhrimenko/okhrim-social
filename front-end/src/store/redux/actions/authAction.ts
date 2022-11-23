import {AppDispatch} from "../index";
import AuthService from "../../../services/AuthService";
import {setAuth, setLoading, setUser} from "../slices/userSlice";
import {IUser} from "../../../models/IUser";
import axios from "axios";
import {AuthResponse} from "../../../models/response/AuthResponse";
import {notify, notifyUpdate} from "../../../utils/notification/alerts";
import {toast} from "react-toastify";

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    const loading = toast.loading("Loading...")
    try {
        const response = await AuthService.login(email, password);
        localStorage.setItem('token', response.data.accessToken)

        notifyUpdate(loading, 'Login successfully', 'success')
        dispatch(setAuth(true))
        dispatch(setUser(response.data.user))
    } catch (e: any) {
        notifyUpdate(loading, e.response?.data?.message, 'error')
    }
}

export const registration = (email: string, password: string) => async (dispatch: AppDispatch) => {
    const loading = toast.loading("Loading...")
    try {
        const response = await AuthService.registration(email, password);
        localStorage.setItem('token', response.data.accessToken)

        notifyUpdate(loading, 'Registration successfully', 'success')
        dispatch(setAuth(true))
        dispatch(setUser(response.data.user))
    } catch (e: any) {
        notifyUpdate(loading, e.response?.data?.message, 'error')
    }
}

export const logout = () => async (dispatch: AppDispatch) => {
    const loading = toast.loading("Loading...")
    try {
        await AuthService.logout();
        localStorage.removeItem('token')

        notifyUpdate(loading, 'Logout success', 'success')
        dispatch(setAuth(false))
        dispatch(setUser({} as IUser))
    } catch (e: any) {
        notifyUpdate(loading, e.response?.data?.message, 'error')
    }
}

export const checkAuth = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true))
    try {
        const response = await axios.get<AuthResponse>(`https://okhrim-social.onrender.com/api/refresh`, {withCredentials: true})
        localStorage.setItem('token', response.data.accessToken)
        dispatch(setAuth(true))
        dispatch(setUser(response.data.user))
    } catch (e: any) {
        notify('error', `${e.response.data.message}`)
        localStorage.removeItem('token')
    } finally {
        dispatch(setLoading(false))
    }
}

export const createProfile = (body: any) => async (dispatch: AppDispatch) => {
    const loading = toast.loading("Loading...")
    try {
        const response = await AuthService.createProfile(body)
<<<<<<< HEAD

        notifyUpdate(loading, 'Profile successfully created', 'success')
=======
        console.log(response)
>>>>>>> parent of 4e7e8e8 (Fix: auth, chat, token , change profile genre and platforms to slider)
        // @ts-ignore
        dispatch(setUser(response.data))
    } catch (e:any) {
        notifyUpdate(loading, e.response?.data?.message, 'error')
    }
}