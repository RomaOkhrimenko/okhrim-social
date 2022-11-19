import React, {FC, useEffect, useState} from 'react';

import styles from './AddGames.module.scss'

import Button from "../../../ui/Button";
import GameBlock from "../../blocks/game-block/GameBlock";
import Input from "../../../ui/Input";
import {IGame} from "../../../models/IGame";
import {useGetGamesQuery} from "../../../store/redux/api";

interface IProps {
    saveGames: (arg0: IGame[]) => void,
    chooseGames: IGame[],
    handleEditStatus: (arg0: boolean) => void
}

const SecondStep: FC<IProps> = ({saveGames, chooseGames, handleEditStatus}) => {
    const [choseGames, setChoseGames] = useState<IGame[]>(chooseGames)
    const [keyword, setKeyword] = useState('')

    const {data: games} = useGetGamesQuery(keyword)

    const isChosePlatform = (gameId: string) => {
        const founded = choseGames.find((game) => game._id === gameId)

        return !!founded;
    }

    const handleGames = (gameData: IGame) => {
        const isExist = choseGames.find((game) => game._id === gameData._id)

        if (isExist) {
            const newData = choseGames.filter((game) => game._id !== gameData._id)

            setChoseGames(newData)
            return
        }

        setChoseGames([...choseGames, gameData])
    }

    const onCancel = () => {
        setChoseGames(chooseGames)
        handleEditStatus(false)
    }

    const onSubmit = () => {

        saveGames(choseGames)
        handleEditStatus(false)
    }

    return (
        <div className={styles.add_games}>
            <h2>Edit Games</h2>

            <Input value={keyword} setValue={setKeyword} name={'search'} placeholder={'Type to search game...'} className={styles.add_games__input} />
            <div className={styles.add_games__games}>
                {games && games.map((item) => {
                    return <GameBlock key={item._id} onClick={handleGames} data={item} isActive={isChosePlatform(`${item._id}`)} image={item.image} name={item.name} />
                })}
            </div>

            <div className={styles.add_games__buttons}>
                <Button onClick={onCancel} className={`${styles.add_games__btn_prev} ${!choseGames.length ? styles.disabled : ''}`}>Cancel</Button>
                <Button onClick={onSubmit} className={`${styles.add_games__btn_next} ${!choseGames.length ? styles.disabled : ''}`}>Save</Button>
            </div>
        </div>
    );
};

export default SecondStep;