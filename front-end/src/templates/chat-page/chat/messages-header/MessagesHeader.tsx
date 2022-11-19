import React, {FC} from 'react';

import styles from './MessagesHeader.module.scss'

import Image from '../../../../assets/images/png/User.png'
import {AiOutlineCloseCircle} from "react-icons/ai";

interface IProps {
    username: string,
    image: string | undefined
    resetCurrentChat: () => void
}

const MessagesHeader: FC<IProps> = ({username ,resetCurrentChat, image}) => {
    return (
        <div className={styles.messages_header}>
            <div className={styles.messages_header__details}>
                <div className={styles.messages_header__details_avatar}>
                    <img
                        src={image ? image : Image}
                        alt="Image"
                    />
                </div>
                <div className={styles.messages_header__details_username}>
                    <h3>{username}</h3>
                </div>
            </div>
           <AiOutlineCloseCircle onClick={resetCurrentChat} />
        </div>
    );
};

export default MessagesHeader;