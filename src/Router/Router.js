import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Explore from '../Pages/Explore/Explore';
import History from '../Pages/History/History';
import Home from '../Pages/Home/Home';
import LikedVideos from '../Pages/LikedVideos/LikedVideos';
import Login from '../Pages/Login/Login';
import IndividualPlaylist from '../Pages/PlayList/IndividualPlaylist/IndividualPlaylist';
import Playlist from '../Pages/PlayList/Playlist';
import Video from '../Pages/Video/Video';
import WatchLater from '../Pages/Watch-later/Watch-later';
import RequireAuth from '../Contexts/RequireAuth/RequireAuth'
import PageNotFound from '../Pages/Error/PageNotFound';
import RedirectAuth from '../Contexts/RequireAuth/RedirectAuth';
import Signup from '../Pages/Login/Signup';

const Router = () => {
    return (
        <div className='main-section'>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/explore" element={ <Explore/> } />
                <Route element={<RedirectAuth />}>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/signup" element={<Signup/>} />
                </Route>
                <Route element={<RequireAuth />}>
                    <Route path="/video/:videoId" element={<Video />} />
                    <Route path="/history" element={<History/>} />
                    <Route path="/liked-videos" element={<LikedVideos/>} />
                    <Route path="/playlist" element={<Playlist/>} />
                    <Route path="/playlist/:playlistId" element={<IndividualPlaylist />} />
                    <Route path="/watch-later" element={<WatchLater/>} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
};

export default Router;