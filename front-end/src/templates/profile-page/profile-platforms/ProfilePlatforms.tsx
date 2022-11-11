import React, {FC, useEffect} from 'react';

import styles from './ProfilePlatforms.module.scss'
import GameBlock from "../../blocks/game-block/GameBlock";

import Swiper, {Navigation} from "swiper";
import {ReactComponent as ArrowLeft} from "../../../assets/images/svg/arrow-left.svg";
import {ReactComponent as ArrowRight} from "../../../assets/images/svg/arrow-right.svg";
import {IPlatform} from "../../../models/IPlatform";

interface IProps {
    platforms: IPlatform[]
}

const ProfilePlatforms: FC<IProps> = ({platforms}) => {

    useEffect(() => {
        Swiper.use([Navigation])
        const swiper = new Swiper('.profile-platforms-swiper', {
            slidesPerView: 'auto',
            watchOverflow: true,
            navigation: {
                prevEl: `.profile_platforms__navigation_prev`,
                nextEl: `.profile_platforms__navigation_next`,
            }
        })
    }, [])

    return (
        <div className={styles.profile_platforms}>
            <h3>{platforms.length} Platforms</h3>

            <div className={'profile-platforms-swiper'}>
                <div className={`${styles.profile_platforms__container} swiper-wrapper`}>
                    {platforms.map((platform) => {
                        return (
                            <div key={platform._id} className={`${styles.profile_platforms__platform} swiper-slide`}>
                                {platform.name}
                            </div>
                        )
                    })}
                </div>

                <div className={styles.profile_platforms__navigation}>
                    <div className={`${styles.profile_platforms__navigation_prev} profile_platforms__navigation_prev`}>
                        <ArrowLeft />
                    </div>

                    <div className={`${styles.profile_platforms__navigation_next} profile_platforms__navigation_next`}>
                        <ArrowRight />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePlatforms;