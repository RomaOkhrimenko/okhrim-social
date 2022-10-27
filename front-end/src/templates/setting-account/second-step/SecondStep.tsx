import React, {FC, useState} from 'react';

import styles from './SecondStep.module.scss'

import Action from '../../../assets/images/png/steps/step2/action.png'
import Adventure from '../../../assets/images/png/steps/step2/adventure.png'
import Fight from '../../../assets/images/png/steps/step2/fight.png'
import RPG from '../../../assets/images/png/steps/step2/rpg-game.png'
import Sports from '../../../assets/images/png/steps/step2/sports.png'
import Strategy from '../../../assets/images/png/steps/step2/strategy.png'

import PlatformBlock from "../platform-block/PlatformBlock";
import Button from "../../../ui/Button";
import {IGenre} from "../../../models/IGenre";

interface Genres {
    id: number
    image: string
    name: string
}

interface IProps {
    handleStep: (arg0: number) => void,
    genres: IGenre[],
    saveGenres: (arg0: string[]) => void,
    chooseGenres: string[]
}

const SecondStep: FC<IProps> = ({handleStep, genres, saveGenres, chooseGenres}) => {
    const [choseGenres, setChoseGenres] = useState<string[] | []>(chooseGenres)

    const isChosePlatform = (platformId: string) => {
        const founded = choseGenres.find((id) => id === platformId)

        return !!founded;
    }

    const handlePlatforms = (platformId: string) => {
        const isExist = choseGenres.find((id) => id === platformId)

        if (isExist) {
            const newData = choseGenres.filter((id) => id !== platformId)

            setChoseGenres(newData)
            return
        }

        setChoseGenres([...choseGenres, platformId])
    }

    const onSubmit = () => {
        saveGenres(choseGenres)
        handleStep(3)
    }

    return (
        <div className={styles.second_step}>
            <h2>Step 2</h2>
            <span>Choose your favorite genres</span>

            <div className={styles.second_step__genres}>
                {genres.map((item) => {
                    return <PlatformBlock key={item._id} onClick={handlePlatforms} id={`${item._id}`} isActive={isChosePlatform(`${item._id}`)} image={item.image} name={item.name} />
                })}
            </div>

            <div className={styles.second_step__buttons}>
                <Button onClick={() => handleStep(1)} className={`${styles.second_step__btn_prev}`}>Back</Button>
                <Button onClick={onSubmit} className={`${styles.second_step__btn_next} ${!choseGenres.length ? styles.disabled : ''}`}>Continue</Button>
            </div>
        </div>
    );
};

export default SecondStep;