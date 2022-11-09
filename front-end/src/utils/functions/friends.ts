import {useAppDispatch} from "../../hooks/redux";
import {acceptFriendRequest, addFriend, deleteFriend, deleteFriendRequest} from "../../store/redux/actions/userAction";
import {AppDispatch} from "../../store/redux";

export const onAddFriend = (userId: string, friendId: string, dispatch: AppDispatch) => {
    dispatch(addFriend(userId, friendId))
}

export const onDeleteFriendRequest = (userId: string, friendId: string, dispatch: AppDispatch) => {
    dispatch(deleteFriendRequest(userId, friendId))
}

export const onDeleteFriend = (userId: string, friendId: string, dispatch: AppDispatch) => {
    dispatch(deleteFriend(userId, friendId))
}

export const onAcceptFriendRequest = (userId: string, friendId: string, dispatch: AppDispatch) => {
    dispatch(acceptFriendRequest(userId, friendId))
}