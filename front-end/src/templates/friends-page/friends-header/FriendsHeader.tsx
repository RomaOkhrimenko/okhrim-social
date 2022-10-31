import React, {FC} from 'react';

import styles from './FriendsHeader.module.scss'

interface IProps {
    isFriend: boolean,
    setIsFriend: (arg0: boolean) => void,
    friendsCount: number,
    requestFriendsCount: number
}

const FriendsHeader: FC<IProps> = ({isFriend, setIsFriend, friendsCount, requestFriendsCount}) => {
    return (
        <div className={styles.friends_header}>
            <span onClick={() => setIsFriend(true)} className={isFriend ? styles.active : ''}>{friendsCount} Friends</span>
            <span onClick={() => setIsFriend(false)} className={!isFriend ? styles.active : ''}>{requestFriendsCount} Request Friends</span>
        </div>
    );
};

export default FriendsHeader;