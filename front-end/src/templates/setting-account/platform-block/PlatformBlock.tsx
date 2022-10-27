import React, {FC} from 'react';

import styles from './PlatformBlock.module.scss'

interface IProps {
    image: string,
    name: string,
    isActive: boolean,
    id: string,
    onClick: any
}

const PlatformBlock: FC<IProps> = ({image, name, isActive, onClick, id}) => {
    return (
        <div onClick={() => onClick(id)} className={`${styles.platform_block} ${isActive ? styles.active : ''}`}>
            <img src={image} alt="image"/>
            <span>{name}</span>
        </div>
    );
};

export default PlatformBlock;