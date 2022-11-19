import {AppDispatch} from "../index";
import {instance} from "../../../http";
import {setUser} from "../slices/userSlice";
import {notify} from "../../../utils/notification/alerts";
import {IUser} from "../../../models/IUser";

export const addFriend = (userId: string, friendId: string) => async (dispatch: AppDispatch) => {
    try {
        await instance.post('/request-friend', {userId, friendId})
        const user = await instance.get(`/user/${userId}`)
            .then(({data}) => data)

        dispatch(setUser(user))
    } catch (e: any) {
        notify('error', `${e.response?.data?.message}`)
    }
}

export const deleteFriendRequest = (userId: string, friendId: string) => async (dispatch: AppDispatch) => {
    try {
        await instance.post('/delete-friend-request', {userId, friendId})
        const user = await instance.get(`/user/${userId}`)
            .then(({data}) => data)

        dispatch(setUser(user))
    } catch (e: any) {
        notify('error', `${e.response?.data?.message}`)
    }
}

export const deleteFriend = (userId: string, friendId: string) => async (dispatch: AppDispatch) => {
    try {
        await instance.post('/delete-friend', {userId, friendId})
        const user = await instance.get(`/user/${userId}`)
            .then(({data}) => data)

        dispatch(setUser(user))
    } catch (e: any) {
        notify('error', `${e.response?.data?.message}`)
    }
}

export const acceptFriendRequest = (userId: string, friendId: string) => async (dispatch: AppDispatch) => {
    try {
        await instance.post('/accept-friend-request', {userId, friendId})
        const user = await instance.get(`/user/${userId}`)
            .then(({data}) => data)

        dispatch(setUser(user))
    } catch (e: any) {
        notify('error', `${e.response?.data?.message}`)
    }
}

export const resetPrevUser = (userId: string) => async (dispatch: AppDispatch) => {
    try {
        await instance.post('/reset-prev-users', {userId})

        const user = await instance.get(`/user/${userId}`)
            .then(({data}) => data)

        notify('success', 'Reset prev users success')

        dispatch(setUser(user))
    } catch (e: any) {
        notify('error', `${e.response?.data?.message}`)
    }
}

export const updateUser = (userId: string, data: IUser) => async (dispatch: AppDispatch) => {
    try {
        const response = await instance.put(`/user/${userId}`, data)
            .then(({data}) => data)


        dispatch(setUser(response))
        notify('success', 'Profile successfully edited')

    } catch (e: any) {
        notify('error', e.response?.data?.message)
    }
}