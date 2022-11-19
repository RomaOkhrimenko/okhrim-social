import React, {FC, useEffect, useState} from 'react';

import styles from './ProfileGames.module.scss'
import GameBlock from "../../blocks/game-block/GameBlock";

import {AiOutlinePlusCircle} from 'react-icons/ai'
import Swiper, {Navigation} from "swiper";
import {ReactComponent as ArrowLeft} from "../../../assets/images/svg/arrow-left.svg";
import {ReactComponent as ArrowRight} from "../../../assets/images/svg/arrow-right.svg";
import {IGame} from "../../../models/IGame";
import ModalLayout from "../../modals/modal-layout/ModalLayout";
import AddGames from "../../modals/add-games/AddGames";

interface IProps {
    games: IGame[]
    isEdit?: boolean
    setGames?: (arg0: IGame[]) => void
}

const ProfileGames: FC<IProps> = ({games, isEdit, setGames}) => {
    const [isAddGames, setIsAddGames] = useState(false)
    const [chosenGames, setChosenGames] = useState<IGame[]>([])

    const saveGames = (data: IGame[]) => {
        if (setGames) {
            setGames(data)
        }
    }

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

        setChosenGames([])
        games.map((game) => {
            setChosenGames(prev => [...prev, game])
        })
    }, [games])



    return (
        <div className={styles.profile_games}>

            <div className={styles.profile_games__title}>
                <h3>{games.length} Games</h3>

                {isEdit && <AiOutlinePlusCircle onClick={() => setIsAddGames(true)} />}
            </div>

            {isEdit && <ModalLayout outsideClick={false} active={isAddGames} setActive={setIsAddGames}><AddGames handleEditStatus={setIsAddGames} saveGames={saveGames} chooseGames={chosenGames} /></ModalLayout>}
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