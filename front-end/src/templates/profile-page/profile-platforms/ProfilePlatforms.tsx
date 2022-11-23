<<<<<<< HEAD
import React, {FC, useEffect, useState} from 'react';

import styles from './ProfilePlatforms.module.scss'

import Swiper, {Navigation} from "swiper";
import {AiOutlineEdit} from 'react-icons/ai'
import {ReactComponent as ArrowLeft} from "../../../assets/images/svg/arrow-left.svg";
import {ReactComponent as ArrowRight} from "../../../assets/images/svg/arrow-right.svg";
=======
import React, {FC} from 'react';

import styles from './ProfilePlatforms.module.scss'
>>>>>>> parent of 4e7e8e8 (Fix: auth, chat, token , change profile genre and platforms to slider)
import {IPlatform} from "../../../models/IPlatform";
import ModalLayout from "../../modals/modal-layout/ModalLayout";
import EditPlatforms from "../../modals/edit-platforms/EditPlatforms";
import {useGetPlatformsQuery} from "../../../store/redux/api/platfromsApi";

interface IProps {
    platforms: IPlatform[],
    isEdit?: boolean,
    setPlatforms?: (arg0: IPlatform[]) => void
}

<<<<<<< HEAD
const ProfilePlatforms: FC<IProps> = ({platforms, isEdit, setPlatforms}) => {
    const [isEditPlatforms, setIsEditPlatforms] = useState(false)
    const [chosenPlatforms, setChosenPlatforms] = useState<IPlatform[]>([])

    // @ts-ignore
    const {data} = useGetPlatformsQuery<IPlatform[]>()

    const savePlatforms = (data: IPlatform[]) => {
        if (setPlatforms) {
            setPlatforms(data)
        }
    }

    useEffect(() => {
        Swiper.use([Navigation])
        const swiper = new Swiper('.profile-platforms-swiper', {
            slidesPerView: 'auto',
            watchOverflow: true,
            navigation: {
                prevEl: `.profile_platforms__navigation_prev`,
                nextEl: `.profile_platforms__navigation_next`,
            }
        })

        setChosenPlatforms([])
        platforms.map((platform) => {
            setChosenPlatforms(prev => [...prev, platform])
        })
    }, [platforms])



=======
const ProfilePlatforms: FC<IProps> = ({platforms}) => {
>>>>>>> parent of 4e7e8e8 (Fix: auth, chat, token , change profile genre and platforms to slider)
    return (
        <div className={styles.profile_platforms}>
            <div className={styles.profile_platforms__title}>
                <h3>{platforms.length} Platforms</h3>
                {isEdit && <AiOutlineEdit onClick={() => setIsEditPlatforms(true)} />}
            </div>

            {isEdit && <ModalLayout active={isEditPlatforms} outsideClick={false} setActive={setIsEditPlatforms}><EditPlatforms savePlatforms={savePlatforms} platforms={data} handleEditStatus={setIsEditPlatforms} choosePlatforms={chosenPlatforms} /></ModalLayout>}

            <div className={styles.profile_platforms__container}>
                {platforms.map((platform) => {
                    return (
                        <div key={platform.slug} className={styles.profile_platforms__genre}>
                            {platform.name}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default ProfilePlatforms;