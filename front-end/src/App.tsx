import React, {useEffect, lazy, useContext, useLayoutEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";

import Layout from "./templates/layout/Layout";
import ProtectedRoutes from "./utils/protected-routes/ProtectedRoutes";
import ContextProvider, {Context} from "./store/context/context";

import { ToastContainer } from 'react-toastify';

import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {checkAuth} from "./store/redux/actions/authAction";

import 'react-toastify/dist/ReactToastify.css';
import Loader from "./templates/loader/Loader";
import {set} from "react-hook-form";

const HomePage = lazy(() => import("./pages/home-page/HomePage"));
const SettingsAccount = lazy(() => import("./templates/setting-account/SettingsAccount"));
const Chat = lazy(() => import("./pages/chat-page/Chat"));
const ProfilePage = lazy(() => import("./pages/profile-page/ProfilePage"));
const FriendsPage = lazy(() => import("./pages/friends-page/FriendsPage"));
const GamesPage = lazy(() => import("./pages/games-page/GamesPage"));

function App() {
    const dispatch = useAppDispatch()
    const [isLoading , setIsLoading] = useState(false)

    useLayoutEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLoading(true)
            dispatch(checkAuth()).finally(() => setIsLoading(false))
        }
    }, [])

    if(isLoading) {
        return <Loader />
    }

  return (
      <ContextProvider>
        <div className="App">
              <Routes>
                  <Route element={<ProtectedRoutes />}>
                    <Route path={'/settings-account'} element={
                        <React.Suspense fallback={<Loader />}>
                            <SettingsAccount />
                        </React.Suspense>} />
                    <Route path={'/'} element={
                            <Layout><HomePage /></Layout>
                        } />
                        <Route path={'/friends'} element={
                            <Layout><FriendsPage /></Layout>
                        } />
                        <Route path={'/messages'} element={
                            <Layout isContainer={false} isPaddingBottom={false}><Chat /></Layout>
                        } />
                        <Route path={'/profile/:id'} element={
                            <Layout><ProfilePage /></Layout>
                        } />
                        <Route path={'/games'} element={
                            <Layout><GamesPage /></Layout>
                        } />
                </Route>
              </Routes>

            <ToastContainer
                position={'top-center'}
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={'dark'}
            />

        </div>
      </ContextProvider>
  );
}

export default App;
