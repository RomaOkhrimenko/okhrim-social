import React, {FC, useEffect, useState} from 'react';

import styles from './ProfilePlatforms.module.scss'

import Swiper, {Navigation} from "swiper";
import {AiOutlineEdit} from 'react-icons/ai'
import {ReactComponent as ArrowLeft} from "../../../assets/images/svg/arrow-left.svg";
import {ReactComponent as ArrowRight} from "../../../assets/images/svg/arrow-right.svg";
import {IPlatform} from "../../../models/IPlatform";
import ModalLayout from "../../modals/modal-layout/ModalLayout";
import EditPlatforms from "../../modals/edit-platforms/EditPlatforms";
import {useGetPlatformsQuery} from "../../../store/redux/api/platfromsApi";

interface IProps {
    platforms: IPlatform[],
    isEdit?: boolean,
    setPlatforms?: (arg0: IPlatform[]) => void
}

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



    return (
        <div className={styles.profile_platforms}>
            <div className={styles.profile_platforms__title}>
                <h3>{platforms.length} Platforms</h3>
                {isEdit && <AiOutlineEdit onClick={() => setIsEditPlatforms(true)} />}
            </div>

            {isEdit && <ModalLayout active={isEditPlatforms} outsideClick={false} setActive={setIsEditPlatforms}><EditPlatforms savePlatforms={savePlatforms} platforms={data} handleEditStatus={setIsEditPlatforms} choosePlatforms={chosenPlatforms} /></ModalLayout>}

            <div className={'profile-platforms-swiper'}>
                <div className={`${styles.profile_platforms__container} swiper-wrapper`}>
                    {platforms.map((platform) => {
                        return (
                            <div key={platform._id} className={`${styles.profile_platforms__platform} swiper-slide`}>
                                {platform.name}
                            </div>
                        )
                    })}
                </div>

                <div className={styles.profile_platforms__navigation}>
                    <div className={`${styles.profile_platforms__navigation_prev} profile_platforms__navigation_prev`}>
                        <ArrowLeft />
                    </div>

                    <div className={`${styles.profile_platforms__navigation_next} profile_platforms__navigation_next`}>
                        <ArrowRight />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePlatforms;