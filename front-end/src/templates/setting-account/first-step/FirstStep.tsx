import React, {FC, useState} from 'react';

import styles from './FirstStep.module.scss'

import Xbox from '../../../assets/images/png/steps/xbox.png'
import Ps from '../../../assets/images/png/steps/playstation.png'
import PC from '../../../assets/images/png/steps/monitor.png'
import Mobile from '../../../assets/images/png/steps/smartphone.png'

import PlatformBlock from "../platform-block/PlatformBlock";
import Button from "../../../ui/Button";

interface Platform {
    id: number
    image: string
    name: string
}

interface IProps {
    handleStep: (arg0: number) => void
}

const platformsData = [
    {id: 1, image: Xbox, name: 'Xbox'},
    {id: 2, image: Ps, name: 'Playstation'},
    {id: 3, image: PC, name: 'PC'},
    {id: 4, image: Mobile, name: 'Mobile'},
]

const FirstStep: FC<IProps> = ({handleStep}) => {
    const [platforms, setPlatforms] = useState<number[] | []>([])

    const isChosePlatform = (platformId: number) => {
        const founded = platforms.find((id) => id === platformId)

        return !!founded;
    }

    const handlePlatforms = (platformId: number) => {
        const isExist = platforms.find((id) => id === platformId)

        if (isExist) {
            const newData = platforms.filter((id) => id !== platformId)

            setPlatforms(newData)
            return
        }

        setPlatforms([...platforms, platformId])
    }

    return (
        <div className={styles.first_step}>
            <h2>Step 1</h2>
            <span>Choose your platforms</span>

            <div className={styles.first_step__platforms}>
                {platformsData.map((item) => {
                    return <PlatformBlock key={item.id} onClick={handlePlatforms} id={item.id} isActive={isChosePlatform(item.id)} image={item.image} name={item.name} />
                })}
            </div>

            <div>
                <Button onClick={() => handleStep(2)} className={`${styles.first_step__btn} ${!platforms.length ? styles.disabled : ''}`}>Continue</Button>
            </div>
        </div>
    );
};

export default FirstStep;