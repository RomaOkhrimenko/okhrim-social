import React, {FC, useContext, useEffect, useState} from 'react';

import styles from './FilterUserForm.module.scss'
import Button from "../../../ui/Button";
import {useNavigate} from "react-router";
import {findUsers} from "../../../utils/functions/findUsers";
import {Context} from "../../../store/context/context";
import {useAppDispatch} from "../../../hooks/redux";
import {setFilterData} from "../../../store/redux/slices/gameSlice";

interface IProps {
    gameName: string,
    gameId: string,
    userId: string
}

const FilterUserForm: FC<IProps> = ({gameName, gameId, userId}) => {
    const dispatch = useAppDispatch()
    const {setIsFindUsers} = useContext(Context)
    const [gender, setGender] = useState('male')
    const navigate = useNavigate()
    const onFindUser = () => {
        const body = {
            gameId,
            userId,
            gender
        }
        setIsFindUsers(true)
        dispatch(setFilterData(body))
        findUsers(gender, gameId, userId, navigate)
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


            <Button onClick={onFindUser} className={styles.filter_user_form__button_btn}>Search</Button>
        </div>
    );
};

export default FilterUserForm;