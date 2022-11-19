import React, {FC} from 'react';

import styles from './GameBlock.module.scss'
import {AiOutlineClose} from 'react-icons/ai'
import {IGame} from "../../../models/IGame";

interface IProps {
    image: string,
    name: string,
    data?: string | IGame,
    onClick?: any,
    isActive?: boolean
    isEdit?: boolean
}

const GameBlock:FC<IProps> = ({image, name, data, onClick, isEdit, isActive}) => {
    return (
        <>
        {
            onClick ?
                //@ts-ignore
                <div onClick={() => onClick(data)} className={`${styles.game_block} ${styles.click} ${isActive ? styles.active : ''}`}>
                    <img src={image} alt={name} />
                    <div className={styles.game_block__name}>{name}</div>
                </div>
                : <div className={`${styles.game_block}`}>
                    <img src={image} alt={name} />
                    <div className={styles.game_block__name}>{name}</div>
                    {isEdit && <AiOutlineClose />}
                </div>
        }
        </>
    );
};

export default GameBlock;