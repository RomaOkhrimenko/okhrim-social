import React from 'react';

import styles from './GamesPage.module.scss'
import GamesContainer from "../../templates/games-page/games-container/GamesContainer";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import FindUserBlock from "../../templates/blocks/find-user-block/FindUserBlock";
import Button from "../../ui/Button";
import {resetPrevUser} from "../../store/redux/actions/userAction";

const GamesPage = () => {
    const myGames = useAppSelector((state) => state.user.user.profile?.games)
    const userId = useAppSelector(state => state.user.user._id)
    const dispatch = useAppDispatch()

    const onResetPrevUsers = () => {
        dispatch(resetPrevUser(userId))
    }

    if(!myGames!.length) {
        return <div></div>
    }

    return (
        <div className={styles.games_page}>
            <h2 className={styles.games_page__title_category}>Click on the game to find your team</h2>
            <div className={styles.games_page__button_container}>
                <Button onClick={onResetPrevUsers} className={styles.games_page__button}>Reset Prev Users</Button>
            </div>
            <GamesContainer games={myGames!} />

        </div>
    );
};

export default GamesPage;