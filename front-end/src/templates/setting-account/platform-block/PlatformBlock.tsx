import React, {FC} from 'react';

import styles from './PlatformBlock.module.scss'
import {IPlatform} from "../../../models/IPlatform";

interface IProps {
    image: string,
    name: string,
    isActive: boolean,
    data: string | IPlatform,
    onClick: any
}

const PlatformBlock: FC<IProps> = ({image, name, isActive, onClick, data}) => {
    return (
        <div onClick={() => onClick(data)} className={`${styles.platform_block} ${isActive ? styles.active : ''}`}>
            <img src={image} alt="image"/>
            <span>{name}</span>
        </div>
    );
};

export default PlatformBlock;