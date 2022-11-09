import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "./templates/layout/Layout";
import HomePage from "./pages/home-page/HomePage";
import SettingsAccount from "./templates/setting-account/SettingsAccount";
import Chat from "./pages/chat-page/Chat";
import ProfilePage from "./pages/profile-page/ProfilePage";
import GamesPage from "./pages/games-page/GamesPage";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {checkAuth} from "./store/redux/actions/authAction";
import ProtectedRoutes from "./utils/protected-routes/ProtectedRoutes";
import FriendsPage from "./pages/friends-page/FriendsPage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FindUserBlock from "./templates/blocks/find-user-block/FindUserBlock";
import {Context} from "./store/context/context";

function App() {
    const [isFindUsers, setIsFindUsers] = useState(false)
    const data = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        }
    }, [])

    if(data.isLoading) {
        return <div></div>
    }

  return (
      <Context.Provider value={{
          isFindUsers,
          setIsFindUsers
      }}>
        <div className="App">
              <Routes>
                  <Route element={<ProtectedRoutes />}>
                    <Route path={'/settings-account'} element={<SettingsAccount />} />
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
      </Context.Provider>
  );
}

export default App;
