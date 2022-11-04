import React, {FC, ReactNode} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {useGetAnotherUserQuery} from "../store/redux/api";
import {addFriend} from "../store/redux/actions/userAction";

interface IAddFriendButton {
    children: ReactNode
    className: string,
    friendId: string,
    userId: string
}

const AddFriendButton: FC<IAddFriendButton> = ({children, className, friendId, userId}) => {
    const dispatch = useAppDispatch()

    const onClick = () => {
        dispatch(addFriend(userId, friendId))
    }
    return (
        <button onClick={onClick} className={className}>{children}</button>
    );
};

export default AddFriendButton;