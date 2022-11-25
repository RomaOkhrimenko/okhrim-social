import $api, {instance} from "../http";
import {AxiosResponse} from 'axios'
import {AuthResponse} from "../models/response/AuthResponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', {email, password})
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/registration', {email, password})
    }

    static async logout(userId: string): Promise<void> {
        return $api.post('/logout', {_id: userId})
    }

    static async createProfile(body: any) {
        return instance.post('/create-profile', body, {headers: { 'Content-Type': 'application/json' }})
    }
}