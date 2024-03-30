import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/index.tsx';
import Login from '../pages/Login/index.tsx';
import VideoPage from '../pages/VideoPage/index.tsx';
import Register from '../pages/Register/index.tsx';
import ConfirmCreate from '../pages/ConfirmCreate/index.tsx';
import RecoverPassword from '../pages/RecoverPassword/index.tsx';
import NotFound from '../pages/NotFound/index.tsx';
import ConfirmRecoverPassword from '../pages/ConfirmRecoverPassword/index.tsx';
import UserProfile from '../pages/UserProfile/index.tsx';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm-create/:token?" element={<ConfirmCreate />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route
          path="/confirm-recover-password/:token?"
          element={<ConfirmRecoverPassword />}
        />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/video/:mainVideo" element={<VideoPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
