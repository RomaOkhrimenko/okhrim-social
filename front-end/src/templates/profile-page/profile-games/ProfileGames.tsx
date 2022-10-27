import React, {FC, useEffect} from 'react';

import styles from './ProfileGames.module.scss'
import GameBlock from "../../blocks/game-block/GameBlock";

import RocketLeague from '../../../assets/images/jpg/games/rocket-league.jpg'
import Swiper, {Navigation} from "swiper";
import {ReactComponent as ArrowLeft} from "../../../assets/images/svg/arrow-left.svg";
import {ReactComponent as ArrowRight} from "../../../assets/images/svg/arrow-right.svg";
import {IGame} from "../../../models/IGame";

interface IProps {
    games: IGame[]
}

const ProfileGames: FC<IProps> = ({games}) => {

    useEffect(() => {
        Swiper.use([Navigation])
        const swiper = new Swiper('.profile-games-swiper', {
            slidesPerView: 'auto',
            watchOverflow: true,
            navigation: {
                prevEl: `.profile_games__navigation_prev`,
                nextEl: `.profile_games__navigation_next`,
            }
        })
    }, [])

    return (
        <div className={styles.profile_games}>
            <h3>{games.length} Games</h3>

            <div className={'profile-games-swiper'}>
                <div className={`${styles.profile_games__container} swiper-wrapper`}>
                    {games.map((game) => {
                        return (
                            <div key={game._id} className={`${styles.profile_games__game} swiper-slide`}>
                                <GameBlock image={game.image} name={game.name} />
                            </div>
                        )
                    })}

                </div>

                <div className={styles.profile_games__navigation}>
                    <div className={`${styles.profile_games__navigation_prev} profile_games__navigation_prev`}>
                        <ArrowLeft />
                    </div>

                    <div className={`${styles.profile_games__navigation_next} profile_games__navigation_next`}>
                        <ArrowRight />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileGames;