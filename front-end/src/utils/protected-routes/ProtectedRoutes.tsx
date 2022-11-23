import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {Navigate, Outlet} from "react-router";
import {checkAuth} from "../../store/redux/actions/authAction";
import LoginPage from "../../pages/login-page/LoginPage";

const ProtectedRoutes = () => {
    const isAuth = useAppSelector((state) => state.user.isAuth)

    useEffect(() => {
        console.log(isAuth, 'isAuth')
    }, [isAuth])
    return isAuth ? <Outlet /> : <LoginPage />
};

export default ProtectedRoutes;