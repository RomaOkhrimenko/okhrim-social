import React, {FC, useState} from 'react';

import styles from './ThirdStep.module.scss'

import Button from "../../../ui/Button";
import GameBlock from "../../blocks/game-block/GameBlock";
import Input from "../../../ui/Input";
import {IGame} from "../../../models/IGame";

interface IProps {
    handleStep: (arg0: number) => void,
    games: IGame[],
    saveGames: (arg0: string[]) => void,
    chooseGames: string[]
}

const SecondStep: FC<IProps> = ({handleStep, games, saveGames, chooseGames}) => {
    const [choseGames, setChoseGames] = useState<string[] | []>(chooseGames)
    const [search, setSearch] = useState('')

    const isChosePlatform = (platformId: string) => {
        const founded = choseGames.find((id) => id === platformId)

        return !!founded;
    }

    const handlePlatforms = (platformId: string) => {
        const isExist = choseGames.find((id) => id === platformId)

        if (isExist) {
            const newData = choseGames.filter((id) => id !== platformId)

            setChoseGames(newData)
            return
        }

        setChoseGames([...choseGames, platformId])
    }

    const onSubmit = () => {
        saveGames(choseGames)
        handleStep(4)
    }

    return (
        <div className={styles.third_step}>
            <h2>Step 3</h2>
            <span>Choose your favorite games (you can change this options in settings account)</span>

            <Input value={search} setValue={setSearch} name={'search'} placeholder={'Type to search game...'} className={styles.third_step__input} />
            <div className={styles.third_step__games}>
                {games.map((item) => {
                    return <GameBlock key={item._id} onClick={handlePlatforms} id={`${item._id}`} isActive={isChosePlatform(`${item._id}`)} image={item.image} name={item.name} />
                })}
            </div>

            <div className={styles.third_step__buttons}>
                <Button onClick={() => handleStep(2)} className={`${styles.third_step__btn_prev}`}>Back</Button>
                <Button onClick={onSubmit} className={`${styles.third_step__btn_next} ${!choseGames.length ? styles.disabled : ''}`}>Continue</Button>
            </div>
        </div>
    );
};

export default SecondStep;