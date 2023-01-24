import React, {FC, useEffect, useState, useContext} from 'react';
import {useForm} from "react-hook-form";

import styles from './loginFrom.module.scss'

import {ReactComponent as GoogleIco} from '../../../assets/images/svg/google-ico.svg'
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'

import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import {useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {login, registration} from "../../../store/redux/actions/authAction";
import {Context} from "../../../store/context/context";

interface IProps {
    isLogin: boolean
}

const emailPattern = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/g

const LoginForm: FC<IProps> = ({isLogin}) => {
    const user = useAppSelector(state => state.user.user)
    const [showPassword, setShowPassword] = useState(false)

    const {socket} = useContext(Context)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {register, formState: {errors}, handleSubmit, reset} = useForm({mode: 'onBlur'})

    const onSubmit = (data: {email?: string, password?: string}) => {
            if(isLogin) {
                dispatch(login(data.email?.trim()!, data.password?.trim()!))
                    .then(() => {
                        socket.emit('new-user')
                    })
            } else {
                dispatch(registration(data.email?.trim()!, data.password?.trim()!))
                    .then(() => navigate('/settings-account'))
            }
            reset()
    }

    useEffect(() => {
        if(user.profile?.isComplete) {
            navigate(`/profile/${user._id}`)
        } else {
            navigate('/settings-account')
        }
    }, [user])

    return (
        <form className={styles.login_form} onSubmit={handleSubmit(onSubmit)}>
            <div className={`${styles.login_form__input} ${errors?.email?.message ? styles.error : ''}`}>
                <input type="text" {...register('email', {required: 'Type your email', pattern: {value: emailPattern, message: 'Email is wrong'}})} placeholder={'Enter Email'}/>
                {errors?.email && <span className={styles.login_form__input_error}>{`${errors?.email?.message}` || 'Error'}</span>}
            </div>

            <div className={`${styles.login_form__input} ${errors?.password?.message ? styles.error : ''}`}>
                <input type={showPassword ? 'text' : 'password'} {...register('password', {minLength: {value: 4, message: 'Min length 4 Symbols'}, maxLength: {value: 20, message: 'Max length 20 Symbols'}})} placeholder={'Enter Password'} />
                {!showPassword ? <AiOutlineEyeInvisible onClick={() => setShowPassword(true)} /> : <AiOutlineEye onClick={() => setShowPassword(false)} />}
                {errors?.password && <span className={styles.login_form__input_error}>{`${errors?.password?.message}` || 'Error'}</span>}
            </div>

            {/*{isLogin &&  <span className={styles.login_form__recover}>Recover Password ?</span>}*/}
            <Button type={'submit'} className={`${styles.login_form__button}`}>{isLogin ? 'Sign In' : 'Sign Up'}</Button>
            {/*<div className={styles.login_form__choose}>*/}
            {/*    <div className={styles.login_form__choose_line} />*/}
            {/*    <span>Or continue with</span>*/}
            {/*    <div className={styles.login_form__choose_line} />*/}
            {/*</div>*/}
            {/*<div className={styles.login_form__google}>*/}
            {/*    <Button className={styles.login_form__google_btn}><GoogleIco /></Button>*/}
            {/*</div>*/}

            <div className={styles.test_accounts}>
                <div className={styles.test_accounts__account}>
                    <h3>First test account</h3>
                    <div>
                        <span>Email: roma.okhrimenko@gmail.com</span>
                        <span>Password: tgrf7531</span>
                    </div>
                </div>

                <div className={styles.test_accounts__account}>
                    <h3>Second test account</h3>
                    <div>
                        <span>Email: roma.okhrim16@gmail.com</span>
                        <span>Password: tgrf7531</span>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;