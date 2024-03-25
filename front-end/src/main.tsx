import React from 'react';
import * as ReactDOM from 'react-dom/client';

import './styles/reset.css';
import './styles/globals.css';
import AppRoutes from './routes/index.tsx';
import { AuthProvider } from './context/auth.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>,
);
