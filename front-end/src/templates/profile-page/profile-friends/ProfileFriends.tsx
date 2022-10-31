import React, {FC, useEffect} from 'react';

import {ReactComponent as ArrowRight} from "../../../assets/images/svg/arrow-right.svg";
import {ReactComponent as ArrowLeft} from "../../../assets/images/svg/arrow-left.svg";

import styles from './ProfileFriends.module.scss'
import Swiper, {Navigation} from "swiper";
import {IUser} from "../../../models/IUser";
import User from '../../../assets/images/png/settings-man.png'
import Button from "../../../ui/Button";
import {IFriends} from "../../../models/IFriends";
import {useNavigate} from "react-router";

interface IProps {
    friends: IFriends['friends']
}

const ProfileFriends: FC<IProps> = ({friends}) => {

    const navigate = useNavigate()

    useEffect(() => {
        Swiper.use([Navigation])
        const swiper = new Swiper('.profile-friends-swiper', {
            slidesPerView: 'auto',
            watchOverflow: true,
            navigation: {
                prevEl: `.profile_friends__navigation_prev`,
                nextEl: `.profile_friends__navigation_next`,
            }
        })
    }, [])

    return (
        <div className={styles.profile_friends}>
            <h3>{friends.length} Friends</h3>
            <div className={'profile-friends-swiper'}>
                <div className={`${styles.profile_friends__container} swiper-wrapper`}>

                    {friends.map((friend) => {
                        return (
                            <img key={friend.id} src={friend?.image ? friend.image : User} alt={friend?.username} className={`${styles.profile_friends__friend} swiper-slide`} />
                        )
                    })}

                    {!friends.length && (
                        <div className={styles.profile_friends__container_btn}>
                            <Button onClick={() => navigate('/games')} className={styles.profile_friends__btn}>Find Friends</Button>
                        </div>
                    )}
                </div>

                {!!friends.length && (
                    <div className={styles.profile_friends__navigation}>
                        <div className={`${styles.profile_friends__navigation_prev} profile_friends__navigation_prev`}>
                            <ArrowLeft />
                        </div>

                        <div className={`${styles.profile_friends__navigation_prev} profile_friends__navigation_next`}>
                            <ArrowRight />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileFriends;