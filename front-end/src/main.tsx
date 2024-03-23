import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/index.tsx';
import Login from './pages/Login/index.tsx';

import './styles/reset.css';
import './styles/globals.css';
import VideoPage from './pages/VideoPage/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/video/:mainVideo" element={<VideoPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
