import React, {FC, useEffect} from 'react';

import styles from './ProfileGenres.module.scss'

import Swiper, {Navigation} from "swiper";
import {ReactComponent as ArrowLeft} from "../../../assets/images/svg/arrow-left.svg";
import {ReactComponent as ArrowRight} from "../../../assets/images/svg/arrow-right.svg";
import {IPlatform} from "../../../models/IPlatform";

interface IProps {
    genres: IPlatform[]
}

const ProfileGenres: FC<IProps> = ({genres}) => {

    useEffect(() => {
        Swiper.use([Navigation])
        const swiper = new Swiper('.profile-genres-swiper', {
            slidesPerView: 'auto',
            watchOverflow: true,
            navigation: {
                prevEl: `.profile_genres__navigation_prev`,
                nextEl: `.profile_genres__navigation_next`,
            }
        })
    }, [])

    return (
        <div className={styles.profile_genres}>
            <h3>{genres.length} Genres</h3>

            <div className={'profile-genres-swiper'}>
                <div className={`${styles.profile_genres__container} swiper-wrapper`}>
                    {genres.map((genre) => {
                        return (
                            <div key={genre._id} className={`${styles.profile_genres__genre} swiper-slide`}>
                                {genre.name}
                            </div>
                        )
                    })}
                </div>

                <div className={styles.profile_genres__navigation}>
                    <div className={`${styles.profile_genres__navigation_prev} profile_genres__navigation_prev`}>
                        <ArrowLeft />
                    </div>

                    <div className={`${styles.profile_genres__navigation_next} profile_genres__navigation_next`}>
                        <ArrowRight />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileGenres;