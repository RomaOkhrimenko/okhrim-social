import React, {FC} from 'react';

import styles from './ProfileGenres.module.scss'
import {IGenre} from "../../../models/IGenre";

interface IProps {
    genres: IGenre[]
}

const ProfileGenres: FC<IProps> = ({genres}) => {
    return (
        <div className={styles.profile_genres}>
            <h3>{genres.length} Genres</h3>

            <div className={styles.profile_genres__container}>
                {genres.map((genre) => {
                    return (
                        <div key={genre._id} className={styles.profile_genres__genre}>
                            {genre.name}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default ProfileGenres;