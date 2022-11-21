import {instance} from "../../http";
import {notify} from "../notification/alerts";
import {AppDispatch} from "../../store/redux";
import {setLoading} from "../../store/redux/slices/userSlice";

export const findUsers = async (gender: string, gameId: string, userId: string, navigate: any, dispatch: AppDispatch) => {
    dispatch(setLoading(true))
    await instance.post(`/find-user?profile.gender=${gender}&profile.games=${gameId}`, {userId})
        .then(({data}) => data)
        .then((data) => {
            if(data._id) {
                navigate(`/profile/${data._id}`)
            } else {
                notify('warning', 'No one user cannot be founded try reset your prev users')
            }
        })
        .catch((e) => {
            notify('error', 'Something went wrong')
        }).finally(() => {
            setTimeout(() => {dispatch(setLoading(false))}, 500)
        })
}