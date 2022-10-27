import React, {FC, useEffect, useState} from 'react';
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
const LastStepForm: FC<{setData: any}> = ({setData}) => {
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState<Date>(new Date())
    const [birthday, setBirthday] = useState('Birthday')
    const [gender, setGender] = useState('')
    const [modalActive, setModalActive] = useState(false)

    const {register, formState: {errors, isValid}, handleSubmit, reset} = useForm()

    const onSubmit = (data: any) => {

        if(data.username) {
            const body = {
                username: data.username,
                gender: gender,
                description,
                birthday
            }

            setData(body)
        }

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

            <div className={`${styles.last_step_form__col} ${styles.last_step_form__col_desc}`}>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder={'Type your description...'} />
                <span>This is description will see other users</span>
            </div>

            <div className={styles.last_step_form__col}>
                <input type="text" readOnly={true} value={birthday} className={styles.last_step_form__birthday} onClick={() => setModalActive(true)} />
                <span>Click to choose your birthday</span>
            </div>

            <div className={styles.last_step_form__checkboxes}>
                <span>Select your Gender</span>
                    <div>
                        <div className={styles.last_step_form__checkbox}>
                            <input type="checkbox" id={'male'} checked={gender === 'male'} onChange={() => handleGender('male')} />
                            <label htmlFor="male">Male</label>
                        </div>

                        <div className={styles.last_step_form__checkbox}>
                            <input type="checkbox" id={'female'} checked={gender === 'female'} onChange={() => handleGender('female')} />
                            <label htmlFor="female">Female</label>
                        </div>

                        <div className={styles.last_step_form__checkbox}>
                            <input type="checkbox" id={'other'} checked={gender === 'other'} onChange={() => handleGender('other')} />
                            <label htmlFor="other">Other</label>
                        </div>
                        
                    </div>
            </div>

            <input type="submit" hidden={true} onClick={onSubmit} className={'last_Step_form_submit_btn'}/>
        </form>
    );
};

export default LastStepForm;