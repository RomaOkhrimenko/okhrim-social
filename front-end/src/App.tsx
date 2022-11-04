import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/login-page/LoginPage";
import Layout from "./templates/layout/Layout";
import HomePage from "./pages/home-page/HomePage";
import SettingsAccount from "./templates/setting-account/SettingsAccount";
import SettingsPage from "./pages/settings-page/SettingsPage";
import ChatPage from "./pages/chat-page/ChatPage";
import ProfilePage from "./pages/profile-page/ProfilePage";
import GamesPage from "./pages/games-page/GamesPage";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {checkAuth} from "./store/redux/actions/authAction";
import {useNavigate} from "react-router";
import ProtectedRoutes from "./utils/protected-routes/ProtectedRoutes";
import FriendsPage from "./pages/friends-page/FriendsPage";

function App() {
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
                            <Layout><ChatPage /></Layout>
                        } />
                        <Route path={'/profile/:id'} element={
                            <Layout><ProfilePage /></Layout>
                        } />
                        <Route path={'/games'} element={
                            <Layout><GamesPage /></Layout>
                        } />
                </Route>
              </Routes>

        </div>
  );
}

export default App;
