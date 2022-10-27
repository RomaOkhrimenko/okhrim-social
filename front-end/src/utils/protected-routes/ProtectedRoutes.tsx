import React from 'react';
import {useAppSelector} from "../../hooks/redux";
import {Navigate, Outlet} from "react-router";

const ProtectedRoutes = () => {
    const isAuth = useAppSelector((state) => state.user.isAuth)
    return isAuth ? <Outlet /> : <Navigate to={'/login'} />
};

export default ProtectedRoutes;