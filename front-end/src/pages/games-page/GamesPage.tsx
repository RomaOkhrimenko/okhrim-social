import React from 'react';

import styles from './GamesPage.module.scss'
import GamesContainer from "../../templates/games-page/games-container/GamesContainer";
import {useAppSelector} from "../../hooks/redux";

const GamesPage = () => {

    const myGames = useAppSelector((state) => state.user.user.profile?.games)

    if(!myGames!.length) {
        return <div></div>
    }

    return (
        <div className={styles.games_page}>
            <h2 className={styles.games_page__title_category}>Click on the game to find your team</h2>
            <GamesContainer games={myGames!} />
        </div>
    );
};

export default GamesPage;