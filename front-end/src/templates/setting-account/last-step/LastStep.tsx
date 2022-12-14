import React, {FC, useEffect, useState} from 'react';



import styles from './LastStep.module.scss'
import Button from "../../../ui/Button";
import LastStepForm from "./form/LastStepForm";

interface IProps {
    handleStep: (arg0: number) => void,
    handleData: (arg0: {username: string, birthday: string, gender: string, description: string, image: string}) => void,
}

const LastStep: FC<IProps> = ({handleStep, handleData}) => {

    const onClick = () => {
        const btn = document.querySelector('.last_Step_form_submit_btn')
        //@ts-ignore
        btn?.click()
    }

    return (
        <div className={styles.last_step}>
            <h2>Last Step</h2>
            <span>Give information about yourself</span>

            <LastStepForm setData={handleData} />

            <div className={styles.last_step__buttons}>
                <Button onClick={() => handleStep(3)} className={`${styles.last_step__btn_prev}`}>Back</Button>
                <Button onClick={onClick} className={`${styles.last_step__btn_next}`}>Done</Button>
            </div>
        </div>
    );
};

export default LastStep;