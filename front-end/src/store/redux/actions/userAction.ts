import {AppDispatch} from "../index";
import {instance} from "../../../http";
import {setUser} from "../slices/userSlice";

export const addFriend = (userId: string, friendId: string) => async (dispatch: AppDispatch) => {
    try {
        await instance.post('/request-friend', {userId, friendId})
        const user = await instance.get(`/user/${userId}`)
            .then(({data}) => data)

        dispatch(setUser(user))
    } catch (e: any) {
        alert(e?.data?.message)
    }
}

export const deleteFriendRequest = (userId: string, friendId: string) => async (dispatch: AppDispatch) => {
    try {
        await instance.post('/delete-friend-request', {userId, friendId})
        const user = await instance.get(`/user/${userId}`)
            .then(({data}) => data)

        dispatch(setUser(user))
    } catch (e: any) {
        alert(e?.data?.message)
    }
}

export const acceptFriendRequest = (userId: string, friendId: string) => async (dispatch: AppDispatch) => {
    try {
        await instance.post('/accept-friend-request', {userId, friendId})
        const user = await instance.post(`/user/${userId}`)
            .then(({data}) => data)

        dispatch(setUser(user))
    } catch (e) {
        console.log(e)
    }
}