<<<<<<< HEAD
import React, {useEffect, lazy} from 'react';
import {Route, Routes} from "react-router-dom";

=======
import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
>>>>>>> parent of 4e7e8e8 (Fix: auth, chat, token , change profile genre and platforms to slider)
import Layout from "./templates/layout/Layout";
import ProtectedRoutes from "./utils/protected-routes/ProtectedRoutes";
import ContextProvider from "./store/context/context";

import { ToastContainer } from 'react-toastify';

import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {checkAuth} from "./store/redux/actions/authAction";

import 'react-toastify/dist/ReactToastify.css';
import Loader from "./templates/loader/Loader";

const HomePage = lazy(() => import("./pages/home-page/HomePage"));
const SettingsAccount = lazy(() => import("./templates/setting-account/SettingsAccount"));
const Chat = lazy(() => import("./pages/chat-page/Chat"));
const ProfilePage = lazy(() => import("./pages/profile-page/ProfilePage"));
const FriendsPage = lazy(() => import("./pages/friends-page/FriendsPage"));
const GamesPage = lazy(() => import("./pages/games-page/GamesPage"));

function App() {
    const data = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log(process.env)
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        }
    }, [])


    if(data.isLoading) {
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
                            <Layout isContainer={false}><Chat /></Layout>
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
            />

            <FindUserBlock />
        </div>
      </ContextProvider>
  );
}

export default App;
