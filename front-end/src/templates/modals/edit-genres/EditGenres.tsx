import React, {FC, useEffect, useState} from 'react';

import styles from './EditGenres.module.scss'

import Button from "../../../ui/Button";
import {IPlatform} from "../../../models/IPlatform";
import PlatformBlock from "../../setting-account/platform-block/PlatformBlock";
import {IGenre} from "../../../models/IGenre";

interface IProps {
    saveGenres: (arg0: IGenre[]) => void
    genres: IGenre[],
    chooseGenres: IGenre[],
    handleEditStatus: (arg0: boolean) => void
}

const EditPlatforms: FC<IProps> = ({saveGenres, genres, chooseGenres, handleEditStatus}) => {
    const [choseGenres, setChoseGenres] = useState<IGenre[]>(chooseGenres)

    const isChoseGenre = (genreId: string) => {
        const founded = choseGenres.find((genre) => genre._id === genreId)

        return !!founded;
    }

    const handleGenres = (genreData: IGenre) => {
        const isExist = choseGenres.find((genre) => genre._id === genreData._id)

        if (isExist) {
            const newData = choseGenres.filter((genre) => genre._id !== genreData._id)

            setChoseGenres(newData)
            return
        }

        setChoseGenres([...choseGenres, genreData])
    }

    const onCancel = () => {
        setChoseGenres(chooseGenres)
        handleEditStatus(false)
    }

    const onSave = () => {
        saveGenres(choseGenres)
        handleEditStatus(false)
    }

    return (
        <div className={styles.edit_genres}>
            <h2>Edit Genres</h2>
            <span>Choose your favorite genres</span>

            <div className={styles.edit_genres__platforms}>
                {genres.map((item) => {
                    return <PlatformBlock key={item._id} onClick={handleGenres} data={item} isActive={isChoseGenre(item._id)} image={item.image} name={item.name} />
                })}
            </div>

            <div className={styles.edit_genres__buttons}>
                <Button onClick={onCancel} className={`${styles.edit_genres__btn_prev} ${!choseGenres.length ? styles.disabled : ''}`}>Cancel</Button>
                <Button onClick={onSave} className={`${styles.edit_genres__btn_next} ${!choseGenres.length ? styles.disabled : ''}`}>Save</Button>
            </div>
        </div>
    );
};

export default EditPlatforms;