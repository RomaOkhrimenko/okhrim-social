import React, {FC, useState} from 'react';

import styles from './FilterUserForm.module.scss'
import Button from "../../../ui/Button";
import {useGetFilteredUserQuery} from "../../../store/redux/api";
import {instance} from "../../../http";
import {useNavigate} from "react-router";

interface IProps {
    gameName: string,
    gameId: string
}

const FilterUserForm: FC<IProps> = ({gameName, gameId}) => {
    const [gender, setGender] = useState('male')
    const navigate = useNavigate()

    const onSubmit = async () => {

        const response = await instance.get(`/find-user?profile.gender=${gender}&profile.games=${gameId}`)
            .then(({data}) => data)

        if(response.length) {
            navigate(`/profile/${response[0]._id}`)
        }

        console.log(response)
    }

    return (
        <div className={styles.filter_user_form}>
            <div>
            <div className={styles.filter_user_form__header}>
                <span>Search teammates filter</span>
            </div>

            <div className={styles.filter_user_form__game}>
                <span>Chosen game</span>
                <div>
                    <span>{gameName}</span>
                </div>
            </div>

            <div className={styles.filter_user_form__checkboxes}>
                <span>Select Gender</span>
                <div>
                    <div className={styles.filter_user_form__checkbox}>
                        <input type="checkbox" id={'male'} checked={gender === 'male'} onChange={() => setGender('male')} />
                        <label htmlFor="male">Male</label>
                    </div>

                    <div className={styles.filter_user_form__checkbox}>
                        <input type="checkbox" id={'female'} checked={gender === 'female'} onChange={() => setGender('female')} />
                        <label htmlFor="female">Female</label>
                    </div>

                    <div className={styles.filter_user_form__checkbox}>
                        <input type="checkbox" id={'other'} checked={gender === 'other'} onChange={() => setGender('other')} />
                        <label htmlFor="other">Other</label>
                    </div>

                    <div className={styles.filter_user_form__checkbox}>
                        <input type="checkbox" id={'any'} checked={gender === 'any'} onChange={() => setGender('any')} />
                        <label htmlFor="any">Any</label>
                    </div>
                </div>
            </div>
            </div>


            <Button onClick={onSubmit} className={styles.filter_user_form__button_btn}>Search</Button>
        </div>
    );
};

export default FilterUserForm;