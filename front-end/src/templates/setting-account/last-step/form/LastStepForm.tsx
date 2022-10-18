import React, {useEffect, useState} from 'react';
import Input from "../../../../ui/Input";

//@ts-ignore
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

import styles from './LastStepForm.module.scss'
import ModalLayout from "../../../modals/modal-layout/ModalLayout";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";

const handleDateToDDMMYYYY = (date: Date) => {
    const yyyy = date.getFullYear();
    let mm: any = date.getMonth() + 1; // Months start at 0!
    let dd: any = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '/' + mm + '/' + yyyy;
}

const LastStepForm = () => {
    const [username, setUsername] = useState('')
    const [date, setDate] = useState<Date>(new Date())
    const [birthday, setBirthday] = useState('Birthday')
    const [gender, setGender] = useState('gender-1')
    const [modalActive, setModalActive] = useState(false)

    const {register, formState: {errors, isValid}, handleSubmit, reset} = useForm()
    const navigate = useNavigate()

    const onSubmit = (date: any) => {
        const body = {
            username: date.username,
            gender: gender.split('-')[1],
            birthday
        }

        alert(JSON.stringify(body))

        navigate('/profile')
    }


    const handleDate = (date: Date) => {
        setDate(date)
        setBirthday(handleDateToDDMMYYYY(date))
    }


    const handleGender = (id: string) => {
        setGender(id)
    }

    return (
        <form className={styles.last_step_form} onSubmit={handleSubmit(onSubmit)}>
            <ModalLayout active={modalActive} setActive={setModalActive}><Calendar value={date}  onChange={handleDate} /></ModalLayout>

            <div className={styles.last_step_form__col}>
                <Input className={errors?.username?.message ? styles.error_input : ''} value={username} register={register} registerOptions={{required: 'Type your username'}} type={'text'} setValue={setUsername} placeholder={'Username'} name={'username'} />
                <span>This is how other users will see you</span>
                {errors?.username?.message && <span className={styles.last_step_form__col_error}>{`${errors?.username?.message || 'Error'}`}</span>}
            </div>

            <div className={styles.last_step_form__col}>
                <input type="text" readOnly={true} value={birthday} className={styles.last_step_form__birthday} onClick={() => setModalActive(true)} />
                <span>Click to choose your birthday</span>
            </div>

            <div className={styles.last_step_form__checkboxes}>
                <span>Select your Gender</span>
                    <div>
                        <div className={styles.last_step_form__checkbox}>
                            <input type="checkbox" id={'gender-1'} checked={gender === 'gender-1'} onChange={() => handleGender('gender-1')} />
                            <label htmlFor="gender-1">Male</label>
                        </div>

                        <div className={styles.last_step_form__checkbox}>
                            <input type="checkbox" id={'gender-2'} checked={gender === 'gender-2'} onChange={() => handleGender('gender-2')} />
                            <label htmlFor="gender-2">Female</label>
                        </div>

                        <div className={styles.last_step_form__checkbox}>
                            <input type="checkbox" id={'gender-3'} checked={gender === 'gender-3'} onChange={() => handleGender('gender-3')} />
                            <label htmlFor="gender-3">Other</label>
                        </div>
                        
                    </div>
            </div>

            <input type="submit" hidden={true} className={'last_Step_form_submit_btn'}/>
        </form>
    );
};

export default LastStepForm;