import React, {FC} from 'react';

import styles from './GamesContainer.module.scss'
import {IGame} from "../../../models/IGame";
import GameCard from "../../cards/game-card/GameCard";

interface IProps {
    games: IGame[]
}

const GamesContainer: FC<IProps> = ({games}) => {
    return (
        <div className={styles.games_container}>

            {games.map(item => {
                return (
                    <GameCard game={item} />
                )
            })}
        </div>
    );
};

export default GamesContainer;