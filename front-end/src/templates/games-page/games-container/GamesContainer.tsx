import React, {FC, useState} from 'react';

import styles from './GamesContainer.module.scss'
import {IGame} from "../../../models/IGame";
import GameCard from "../../cards/game-card/GameCard";
import ModalLayout from "../../modals/modal-layout/ModalLayout";
import FilterUserForm from "../../modals/filter-user-form/FilterUserForm";

interface IProps {
    games: IGame[]
}

const GamesContainer: FC<IProps> = ({games}) => {
    const [gameId, setGameId] = useState('')
    const [gameName, setGameName] = useState('')

    const [showModal, setShowModal] = useState(false)

    const onChooseGame = (gameId: string, gameName: string) => {
        setGameId(gameId)
        setGameName(gameName)
        setShowModal(true)

        console.log(gameId, gameName)
    }

    return (
        <div className={styles.games_container}>

            {games.map(item => {
                return (
                    <GameCard key={item._id} onClick={onChooseGame} game={item} />
                )
            })}

            <ModalLayout active={showModal} setActive={setShowModal}>
                <FilterUserForm gameName={gameName} gameId={gameId} />
            </ModalLayout>
        </div>
    );
};

export default GamesContainer;