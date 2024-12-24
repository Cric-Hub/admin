import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import axios from 'axios';
import { AuthContextProvider } from './context/AuthContext.js';
import { ToastProvider } from "./context/ToastContext.js";
import { DarkModeContextProvider } from "./context/darkModeContext.js";
import { ConfirmationProvider } from "./context/ConfirmationContext.js";
import { SnackbarProvider } from "notistack";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <ConfirmationProvider>
        <DarkModeContextProvider>
          <AuthContextProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </AuthContextProvider>
        </DarkModeContextProvider>
      </ConfirmationProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
