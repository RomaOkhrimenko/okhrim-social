import React, {useEffect} from 'react';

import {ReactComponent as ArrowRight} from "../../../assets/images/svg/arrow-right.svg";
import {ReactComponent as ArrowLeft} from "../../../assets/images/svg/arrow-left.svg";

import styles from './ProfileFriends.module.scss'
import Swiper, {Navigation} from "swiper";

const ProfileFriends = () => {

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
            <h3>23 Friends</h3>
            <div className={'profile-friends-swiper'}>
                <div className={`${styles.profile_friends__container} swiper-wrapper`}>
                    <div className={`${styles.profile_friends__friend} swiper-slide`} />
                    <div className={`${styles.profile_friends__friend} swiper-slide`} />
                    <div className={`${styles.profile_friends__friend} swiper-slide`} />
                    <div className={`${styles.profile_friends__friend} swiper-slide`} />
                    <div className={`${styles.profile_friends__friend} swiper-slide`} />
                    <div className={`${styles.profile_friends__friend} swiper-slide`} />
                    <div className={`${styles.profile_friends__friend} swiper-slide`} />
                    <div className={`${styles.profile_friends__friend} swiper-slide`} />
                    <div className={`${styles.profile_friends__friend} swiper-slide`} />
                    <div className={`${styles.profile_friends__friend} swiper-slide`} />

                    <div className={`${styles.profile_friends__friend} swiper-slide`} />
                    <div className={`${styles.profile_friends__friend} swiper-slide`} />
                    <div className={`${styles.profile_friends__friend} swiper-slide`} />
                    <div className={`${styles.profile_friends__friend} swiper-slide`} />
                    <div className={`${styles.profile_friends__friend} swiper-slide`} />
                    <div className={`${styles.profile_friends__friend} swiper-slide`} />
                    <div className={`${styles.profile_friends__friend} swiper-slide`} />
                    <div className={`${styles.profile_friends__friend} swiper-slide`} />

                    <div className={`${styles.profile_friends__friend} swiper-slide`} />
                    <div className={`${styles.profile_friends__friend} swiper-slide`} />
                    <div className={`${styles.profile_friends__friend} swiper-slide`} />
                    <div className={`${styles.profile_friends__friend} swiper-slide`} />
                    <div className={`${styles.profile_friends__friend} swiper-slide`} />
                    <div className={`${styles.profile_friends__friend} swiper-slide`} />
                    <div className={`${styles.profile_friends__friend} swiper-slide`} />
                    <div className={`${styles.profile_friends__friend} swiper-slide`} />
                </div>

                <div className={styles.profile_friends__navigation}>
                    <div className={`${styles.profile_friends__navigation_prev} profile_friends__navigation_prev`}>
                        <ArrowLeft />
                    </div>

                    <div className={`${styles.profile_friends__navigation_prev} profile_friends__navigation_next`}>
                        <ArrowRight />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileFriends;