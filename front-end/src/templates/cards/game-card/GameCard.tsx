import React, {FC} from 'react';

import styles from './GameCard.module.scss'
import {IGame} from "../../../models/IGame";

interface IProps {
    game: IGame
}

const GameCard: FC<IProps> = ({game}) => {
    return (
        <div className={styles.game_card}>
            <img src={game.image} alt=""/>

            <div className={styles.game_card__name}>
                <span>{game.name}</span>
            </div>
        </div>
    );
};

export default GameCard;