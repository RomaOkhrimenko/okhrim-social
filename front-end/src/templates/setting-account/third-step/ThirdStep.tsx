import React, {FC, useState} from 'react';

import styles from './ThirdStep.module.scss'

import CSGO from '../../../assets/images/jpg/games/counter-strike-global.jpg'
import GTAV from '../../../assets/images/jpg/games/gtaV.jpg'
import RocketLeague from '../../../assets/images/jpg/games/rocket-league.jpg'
import Rust from '../../../assets/images/jpg/games/rust.jpg'
import Apex from '../../../assets/images/jpg/games/apex.jpg'

import Button from "../../../ui/Button";
import GameBlock from "../../blocks/game-block/GameBlock";
import Input from "../../../ui/Input";

interface IProps {
    handleStep: (arg0: number) => void
}

const genresData = [
    {id: 1, image: CSGO, name: 'Counter Strike Global Offensive'},
    {id: 2, image: GTAV, name: 'Grand Theft Auto Five'},
    {id: 3, image: RocketLeague, name: 'Rocket League'},
    {id: 4, image: Rust, name: 'Rust'},
    {id: 5, image: Apex, name: 'Apex'},
    {id: 6, image: CSGO, name: 'Counter Strike Global Offensive'},
    {id: 7, image: GTAV, name: 'Grand Theft Auto Five'},
    {id: 8, image: RocketLeague, name: 'Rocket League'},
    {id: 9, image: Rust, name: 'Rust'},
    {id: 10, image: Apex, name: 'Apex'},
    {id: 11, image: CSGO, name: 'Counter Strike Global Offensive'},
    {id: 12, image: GTAV, name: 'Grand Theft Auto Five'},
    {id: 13, image: RocketLeague, name: 'Rocket League'},
    {id: 14, image: Rust, name: 'Rust'},
    {id: 15, image: Apex, name: 'Apex'},
    {id: 16, image: CSGO, name: 'Counter Strike Global Offensive'},
    {id: 17, image: GTAV, name: 'Grand Theft Auto Five'},
    {id: 18, image: RocketLeague, name: 'Rocket League'},
    {id: 19, image: Rust, name: 'Rust'},
    {id: 20, image: Apex, name: 'Apex'},
]

const SecondStep: FC<IProps> = ({handleStep}) => {
    const [genres, setGenres] = useState<number[] | []>([])
    const [search, setSearch] = useState('')

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
        <div className={styles.third_step}>
            <h2>Step 3</h2>
            <span>Choose your favorite games (you can change this options in settings account)</span>

            <Input value={search} setValue={setSearch} name={'search'} placeholder={'Type to search game...'} className={styles.third_step__input} />
            <div className={styles.third_step__games}>
                {genresData.map((item) => {
                    return <GameBlock key={item.id} onClick={handlePlatforms} id={item.id} isActive={isChosePlatform(item.id)} image={item.image} name={item.name} />
                })}
            </div>

            <div className={styles.third_step__buttons}>
                <Button onClick={() => handleStep(2)} className={`${styles.third_step__btn_prev}`}>Back</Button>
                <Button onClick={() => handleStep(4)} className={`${styles.third_step__btn_next} ${!genres.length ? styles.disabled : ''}`}>Continue</Button>
            </div>
        </div>
    );
};

export default SecondStep;