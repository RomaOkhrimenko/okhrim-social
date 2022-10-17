import React, {FC} from 'react';

import styles from './GameBlock.module.scss'

interface IProps {
    image: string,
    name: string,
    id: number,
    onClick: (arg0: number) => void,
    isActive: boolean
}

const GameBlock:FC<IProps> = ({image, name, id, onClick, isActive}) => {
    return (
        <div onClick={() => onClick(id)} className={`${styles.game_block} ${isActive ? styles.active : ''}`}>
            <img src={image} alt={name} />
            <div className={styles.game_block__name}>{name}</div>
        </div>
    );
};

export default GameBlock;