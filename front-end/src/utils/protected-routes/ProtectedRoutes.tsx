import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {Navigate, Outlet} from "react-router";
import {checkAuth} from "../../store/redux/actions/authAction";

const ProtectedRoutes = () => {
    const isAuth = useAppSelector((state) => state.user.isAuth)
    return isAuth ? <Outlet /> : <Navigate to={'/login'} />
};

export default ProtectedRoutes;