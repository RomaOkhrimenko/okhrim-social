import {instance} from "../../http";
import {notify} from "../notification/alerts";

export const findUsers = async (gender: string, gameId: string, userId: string, navigate: any) => {
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
        })
}