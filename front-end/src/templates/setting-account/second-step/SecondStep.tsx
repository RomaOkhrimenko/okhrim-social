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

interface Genres {
    id: number
    image: string
    name: string
}

interface IProps {
    handleStep: (arg0: number) => void
}

const genresData = [
    {id: 1, image: Action, name: 'Action'},
    {id: 2, image: Adventure, name: 'Adventure'},
    {id: 3, image: Fight, name: 'Fight'},
    {id: 4, image: RPG, name: 'RPG'},
    {id: 5, image: Sports, name: 'Sports'},
    {id: 6, image: Strategy, name: 'Strategy'},
]

const SecondStep: FC<IProps> = ({handleStep}) => {
    const [genres, setGenres] = useState<number[] | []>([])

    const isChosePlatform = (platformId: number) => {
        const founded = genres.find((id) => id === platformId)

        return !!founded;
    }

    const handlePlatforms = (platformId: number) => {
        const isExist = genres.find((id) => id === platformId)

        if (isExist) {
            const newData = genres.filter((id) => id !== platformId)

            setGenres(newData)
            return
        }

        setGenres([...genres, platformId])
    }

    return (
        <div className={styles.second_step}>
            <h2>Step 2</h2>
            <span>Choose your favorite genres</span>

            <div className={styles.second_step__genres}>
                {genresData.map((item) => {
                    return <PlatformBlock key={item.id} onClick={handlePlatforms} id={item.id} isActive={isChosePlatform(item.id)} image={item.image} name={item.name} />
                })}
            </div>

            <div className={styles.second_step__buttons}>
                <Button onClick={() => handleStep(1)} className={`${styles.second_step__btn_prev}`}>Back</Button>
                <Button onClick={() => handleStep(3)} className={`${styles.second_step__btn_next} ${!genres.length ? styles.disabled : ''}`}>Continue</Button>
            </div>
        </div>
    );
};

export default SecondStep;