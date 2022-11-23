<<<<<<< HEAD
import React, {FC, useEffect, useState} from 'react';

import styles from './ProfileGenres.module.scss'

import Swiper, {Navigation} from "swiper";
import {AiOutlineEdit} from 'react-icons/ai'
import {ReactComponent as ArrowLeft} from "../../../assets/images/svg/arrow-left.svg";
import {ReactComponent as ArrowRight} from "../../../assets/images/svg/arrow-right.svg";
import {IPlatform} from "../../../models/IPlatform";
import ModalLayout from "../../modals/modal-layout/ModalLayout";
import EditPlatforms from "../../modals/edit-platforms/EditPlatforms";
import {useGetGenresQuery} from "../../../store/redux/api/genresApi";
import {IGenre} from "../../../models/IGenre";
import EditGenres from "../../modals/edit-genres/EditGenres";

interface IProps {
    genres: IGenre[],
    isEdit?: boolean,
    setGenres?: (arg0: IGenre[]) => void
}

const ProfileGenres: FC<IProps> = ({genres, isEdit, setGenres}) => {
    const [isEditGenres, setIsEditGenres] = useState(false)
    const [chosenGenres, setChosenGenres] = useState<IGenre[]>([])

    // @ts-ignore
    const {data} = useGetGenresQuery<IGenre[]>()

    const saveGenres = (data: IGenre[]) => {
        if (setGenres) {
            setGenres(data)
        }
    }

    useEffect(() => {
        Swiper.use([Navigation])
        const swiper = new Swiper('.profile-genres-swiper', {
            slidesPerView: 'auto',
            watchOverflow: true,
            navigation: {
                prevEl: `.profile_genres__navigation_prev`,
                nextEl: `.profile_genres__navigation_next`,
            }
        })

        setChosenGenres([])
        genres.map((platform) => {
            setChosenGenres(prev => [...prev, platform])
        })
    }, [genres])

=======
import React, {FC} from 'react';

import styles from './ProfileGenres.module.scss'
import {IGenre} from "../../../models/IGenre";

interface IProps {
    genres: IGenre[]
}

const ProfileGenres: FC<IProps> = ({genres}) => {
>>>>>>> parent of 4e7e8e8 (Fix: auth, chat, token , change profile genre and platforms to slider)
    return (
        <div className={styles.profile_genres}>
            <div className={styles.profile_genres__title}>
                <h3>{genres.length} Genres</h3>

                {isEdit && <AiOutlineEdit onClick={() => setIsEditGenres(true)} />}
            </div>

            {isEdit && <ModalLayout outsideClick={false} active={isEditGenres} setActive={setIsEditGenres}><EditGenres saveGenres={saveGenres} genres={data} chooseGenres={chosenGenres} handleEditStatus={setIsEditGenres} /></ModalLayout>}

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