import React, {FC, useEffect, useState} from 'react';

import styles from './EditPlatforms.module.scss'

import Button from "../../../ui/Button";
import {IPlatform} from "../../../models/IPlatform";
import PlatformBlock from "../../setting-account/platform-block/PlatformBlock";

interface IProps {
    savePlatforms: (arg0: IPlatform[]) => void
    platforms: IPlatform[],
    choosePlatforms: IPlatform[],
    handleEditStatus: (arg0: boolean) => void
}

const EditPlatforms: FC<IProps> = ({savePlatforms, platforms, choosePlatforms, handleEditStatus}) => {
    const [chosePlatforms, setChosePlatforms] = useState<IPlatform[]>(choosePlatforms)

    const isChosePlatform = (platformId: string) => {
        const founded = chosePlatforms.find((platform) => platform._id === platformId)

        return !!founded;
    }

    const handlePlatforms = (platformData: IPlatform) => {
        const isExist = chosePlatforms.find((platform) => platform._id === platformData._id)

        if (isExist) {
            const newData = chosePlatforms.filter((platform) => platform._id !== platformData._id)

            setChosePlatforms(newData)
            return
        }

        setChosePlatforms([...chosePlatforms, platformData])
    }

    const onCancel = () => {
        setChosePlatforms(choosePlatforms)
        handleEditStatus(false)
    }

    const onSave = () => {
        savePlatforms(chosePlatforms)
        handleEditStatus(false)
    }

    return (
        <div className={styles.edit_platforms}>
            <h2>Edit Platforms</h2>
            <span>Choose your platforms</span>

            <div className={styles.edit_platforms__platforms}>
                {platforms.map((item) => {
                    return <PlatformBlock key={item._id} onClick={handlePlatforms} data={item} isActive={isChosePlatform(item._id)} image={item.image} name={item.name} />
                })}
            </div>

            <div className={styles.edit_platforms__buttons}>
                <Button onClick={onCancel} className={`${styles.edit_platforms__btn_prev} ${!chosePlatforms.length ? styles.disabled : ''}`}>Cancel</Button>
                <Button onClick={onSave} className={`${styles.edit_platforms__btn_next} ${!chosePlatforms.length ? styles.disabled : ''}`}>Save</Button>
            </div>
        </div>
    );
};

export default EditPlatforms;