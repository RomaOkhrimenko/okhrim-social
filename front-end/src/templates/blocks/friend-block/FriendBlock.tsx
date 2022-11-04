import React, {FC, useState} from 'react';

import styles from './FriendBlock.module.scss'

import {ReactComponent as OptionsIco} from "../../../assets/images/svg/options.svg";
import ImagePhoto from '../../../assets/images/png/settings-man.png'
import {useNavigate} from "react-router";

interface IProps {
    isFriend: boolean,
    username: string,
    image: string,
    id: string
}

const FriendBlock: FC<IProps> = ({isFriend, username, image, id}) => {
    const [isMenuActive, setIsMenuActive] = useState(false)
    const navigate = useNavigate()

    return (
        <div className={styles.friend_block}>
            <img onClick={() => navigate(`/profile/${id}`)} src={image ? image : ImagePhoto} alt="image"/>

            <div className={styles.friend_block__info}>
                <span>{username}</span>
                {isFriend && <span>Send message</span>}

                {!isFriend && (
                    <div>
                        <button>Accept request</button>
                        <button>Delete request</button>
                    </div>
                )}
            </div>

            <div onClick={() => setIsMenuActive(prev => !prev)} className={styles.friend_block__options}>
                <OptionsIco />
            </div>

            <div className={`${styles.friend_block__options_menu} ${isMenuActive ? styles.active : ''}`}>
                <span>Delete Friends</span>
            </div>

        </div>
    );
};

export default FriendBlock;