import React, {FC, useState} from 'react';

import styles from './FirstStep.module.scss'

import PlatformBlock from "../platform-block/PlatformBlock";
import Button from "../../../ui/Button";
import {IPlatform} from "../../../models/IPlatform";

interface IProps {
    handleStep?: (arg0: number) => void,
    savePlatforms: (arg0: string[]) => void
    platforms: IPlatform[],
    choosePlatforms: string[]
}

const FirstStep: FC<IProps> = ({handleStep, savePlatforms, platforms, choosePlatforms}) => {
    const [chosePlatforms, setChosePlatforms] = useState<string[]>(choosePlatforms)

    const isChosePlatform = (platformId: string) => {
        const founded = chosePlatforms.find((id) => id === platformId)

        return !!founded;
    }

    const handlePlatforms = (platformId: string) => {
        const isExist = chosePlatforms.find((id) => id === platformId)

        if (isExist) {
            const newData = chosePlatforms.filter((id) => id !== platformId)

            setChosePlatforms(newData)
            return
        }

        setChosePlatforms([...chosePlatforms, platformId])
    }

    const onSubmit = () => {
        savePlatforms(chosePlatforms)

        if(handleStep) {
            handleStep(2)
        }
    }

    return (
        <div className={styles.first_step}>
            <h2>Step 1</h2>
            <span>Choose your platforms</span>

            <div className={styles.first_step__platforms}>
                {platforms.map((item) => {
                    return <PlatformBlock key={item._id} onClick={handlePlatforms} data={item._id} isActive={isChosePlatform(item._id)} image={item.image} name={item.name} />
                })}
            </div>

            <div>
                <Button onClick={onSubmit} className={`${styles.first_step__btn} ${!chosePlatforms.length ? styles.disabled : ''}`}>Continue</Button>
            </div>
        </div>
    );
};

export default FirstStep;