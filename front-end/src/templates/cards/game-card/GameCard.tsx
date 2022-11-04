import React, {FC} from 'react';

import styles from './GameCard.module.scss'
import {IGame} from "../../../models/IGame";

interface IProps {
    game: IGame,
    onClick: (arg0: string, arg1: string) => void
}

const GameCard: FC<IProps> = ({game, onClick}) => {
    return (
        <div onClick={() => onClick(game._id, game.name)} className={styles.game_card}>
            <img src={game.image} alt=""/>

            <div className={styles.game_card__name}>
                <span>{game.name}</span>
            </div>
        </div>
    );
};

export default GameCard;