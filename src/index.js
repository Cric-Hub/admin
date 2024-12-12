import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { AuthContextProvider } from './context/AuthContext.js';
import { ToastProvider } from "./context/ToastContext.js";
import { DarkModeContextProvider } from "./context/darkModeContext.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
