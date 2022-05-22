import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from '../Contexts/RequireAuth/RequireAuth';
import Explore from '../Pages/Explore/Explore';
import History from '../Pages/History/History';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import WatchLater from '../Pages/Watch-later/Watch-later';

const Router = () => {
    return (
        <div className='main-section'>
            <Routes>
                <Route path="/" element={<Home/>} />
                {/* <Route path="/explore" element={<RequireAuth> <Explore/> </RequireAuth>} /> */}
                <Route path="/explore" element={ <Explore/> } />
                <Route path="/history" element={<History/>} />
                <Route path="/watch-later" element={<WatchLater/>} />
                <Route path="/login" element={<Login/>} />
            </Routes>
        </div>
    );
};

export default Router;