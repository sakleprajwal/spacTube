import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from '../Contexts/RequireAuth/RequireAuth';
import Explore from '../Pages/Explore/Explore';
import History from '../Pages/History/History';
import Home from '../Pages/Home/Home';
import LikedVideos from '../Pages/LikedVideos/LikedVideos';
import Login from '../Pages/Login/Login';
import Video from '../Pages/Video/Video';
import WatchLater from '../Pages/Watch-later/Watch-later';

const Router = () => {
    return (
        <div className='main-section'>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/explore" element={<RequireAuth> <Explore/> </RequireAuth>} />
                <Route path="/history" element={<History/>} />
                <Route path="/liked-videos" element={<LikedVideos/>} />
                <Route path="/watch-later" element={<WatchLater/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/video/:videoId" element={<Video />} />
            </Routes>
        </div>
    );
};

export default Router;