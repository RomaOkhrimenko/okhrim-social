import React, {FC, useState} from 'react';

import styles from './FriendsList.module.scss'
import FriendBlock from "../../blocks/friend-block/FriendBlock";
import {useAppSelector} from "../../../hooks/redux";
import {IFriends} from "../../../models/IFriends";

interface IProps {
    isFriend: boolean,
    friends: IFriends
}

const FriendsList: FC<IProps> = ({isFriend, friends}) => {

    return (
        <div className={styles.friends_list}>
            {isFriend && (
                <>
                    {friends?.friends.map(item => {
                        return (
                            <FriendBlock key={item._id} image={item.profile.image?.url} id={item._id} username={item.profile.username}  isFriend={true} />
                        )
                    })}
                </>
            )}

            {!isFriend && (
                <>
                    {friends?.incomeRequests.map(item => {
                        return (
                            <FriendBlock isFriend={false} key={item._id} image={item.profile.image?.url} id={item._id} username={item.profile.username} />
                        )
                    })}
                </>
            )}

        </div>
    );
};

export default FriendsList;