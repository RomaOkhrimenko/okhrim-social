import React, {useContext, useEffect, useState} from 'react';

import styles from './FindUserBlock.module.scss'
import Button from "../../../ui/Button";
import {Context} from "../../../store/context/context";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {useNavigate} from "react-router";
import {findUsers} from "../../../utils/functions/findUsers";
import {resetPrevUser} from "../../../store/redux/actions/userAction";

const FindUserBlock = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const filteredData = useAppSelector(state => state.game.filterData)
   // @ts-ignore
    const {isFindUsers, setIsFindUsers} = useContext(Context)

    const onNextUser = () => {
        findUsers(filteredData.gender, filteredData.gameId, filteredData.userId, navigate)
    }

    const onResetPrevUsers = () => {
        dispatch(resetPrevUser(filteredData.userId))
    }

    return (
        <div className={`${styles.find_user_block__container} ${isFindUsers ? styles.active : ''}`}>
            <div className={styles.find_user_block}>
                <div>
                    <Button onClick={() => setIsFindUsers(false)} className={styles.find_user_block__button}>Stop find users</Button>
                </div>
                <div>
                    <Button onClick={onResetPrevUsers} className={styles.find_user_block__button}>Reset prev users</Button>
                </div>
                <div>
                    <Button onClick={onNextUser} className={styles.find_user_block__button}>Next</Button>
                </div>
            </div>
        </div>
    );
};

export default FindUserBlock;