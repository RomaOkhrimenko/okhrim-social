import React, {FC, useState} from 'react';
import {useForm} from "react-hook-form";

import styles from './loginFrom.module.scss'

import {ReactComponent as GoogleIco} from '../../../assets/images/svg/google-ico.svg'
import {AiOutlineCloseCircle, AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'

import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import {useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {login, registration} from "../../../store/redux/actions/authAction";

interface IProps {
    isLogin: boolean
}

const emailPattern = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/g

const LoginForm: FC<IProps> = ({isLogin}) => {
    const userId = useAppSelector(state => state.user.user._id)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {register, formState: {errors}, handleSubmit, reset} = useForm({mode: 'onBlur'})

    const onSubmit = (data: any) => {
            if(isLogin) {
                dispatch(login(data.email, data.password))
                    .then(() => navigate(`/profile/${userId}`))
            } else {
                dispatch(registration(data.email, data.password))
                    .then(() => navigate('/settings-account'))
            }
            reset()
    }

    return (
        <form className={styles.login_form} onSubmit={handleSubmit(onSubmit)}>
            <div className={`${styles.login_form__input} ${errors?.email?.message ? styles.error : ''}`}>
                <Input value={email} register={register} name={'email'} registerOptions={{required: 'Type your email', pattern: {value: emailPattern, message: 'Email is wrong'}}} setValue={setEmail} placeholder={'Enter Email'} />
                {errors?.email && <span className={styles.login_form__input_error}>{`${errors?.email?.message}` || 'Error'}</span>}
            </div>

            <div className={`${styles.login_form__input} ${errors?.password?.message ? styles.error : ''}`}>
                <Input value={password} name={'password'} register={register} registerOptions={{required: 'Type your password', minLength: {value: 4, message: 'Min length 4 Symbols'}, maxLength: {value: 20, message: 'Max length 20 Symbols'}}}
                       setValue={setPassword} placeholder={'Enter Password'} type={showPassword ? 'text' : 'password'} />
                {!showPassword ? <AiOutlineEyeInvisible onClick={() => setShowPassword(true)} /> : <AiOutlineEye onClick={() => setShowPassword(false)} />}
                {errors?.password && <span className={styles.login_form__input_error}>{`${errors?.password?.message}` || 'Error'}</span>}
            </div>

            {isLogin &&  <span className={styles.login_form__recover}>Recover Password ?</span>}
            <Button type={'submit'} className={`${styles.login_form__button}`}>{isLogin ? 'Sign In' : 'Sign Up'}</Button>
            <div className={styles.login_form__choose}>
                <div className={styles.login_form__choose_line} />
                <span>Or continue with</span>
                <div className={styles.login_form__choose_line} />
            </div>
            <div className={styles.login_form__google}>
                <Button className={styles.login_form__google_btn}><GoogleIco /></Button>
            </div>
        </form>
    );
};

export default LoginForm;