import React, {FC, useContext, useState} from 'react';

import styles from './FriendBlock.module.scss'

import {ReactComponent as OptionsIco} from "../../../assets/images/svg/options.svg";
import ImagePhoto from '../../../assets/images/png/User.png'
import {useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {onAcceptFriendRequest, onDeleteFriend, onDeleteFriendRequest} from "../../../utils/functions/friends";
import {Context} from "../../../store/context/context";

interface IProps {
    isFriend: boolean,
    username: string,
    image: string | undefined,
    id: string
}

const FriendBlock: FC<IProps> = ({isFriend, username, image, id}) => {
    const {setCurrentChatDefault} = useContext(Context)
    const userId = useAppSelector(state => state.user.user._id)
    const dispatch = useAppDispatch()
    const [isMenuActive, setIsMenuActive] = useState(false)
    const navigate = useNavigate()

    const onSendMessage = () => {
        setCurrentChatDefault({id, username, _id: id, image})
        navigate('/messages')
    }

    return (
        <div className={styles.friend_block}>
            <img onClick={() => navigate(`/profile/${id}`)} src={image ? image : ImagePhoto} alt="image"/>

            <div className={styles.friend_block__info}>
                <span>{username}</span>
                {isFriend && <span onClick={onSendMessage}>Send message</span>}

                {!isFriend && (
                    <div>
                        <button onClick={() => onAcceptFriendRequest(userId, id, dispatch)}>Accept request</button>
                        <button onClick={() => onDeleteFriendRequest(userId, id, dispatch)}>Delete request</button>
                    </div>
                )}
            </div>

            <div onClick={() => setIsMenuActive(prev => !prev)} className={styles.friend_block__options}>
                <OptionsIco />
            </div>

            <div className={`${styles.friend_block__options_menu} ${isMenuActive ? styles.active : ''}`}>
                <span onClick={() => onDeleteFriend(userId, id, dispatch)}>Delete Friends</span>
            </div>

        </div>
    );
};

export default FriendBlock;