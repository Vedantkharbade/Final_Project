import React, { useState } from 'react';
import './App.css'

import './index.css';
import 'react-toastify/dist/ReactToastify.css';



import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UserWorkspacePage from './pages/UserWorkspacePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './pages/SecuredRoute';
import SettingWorkspace from './pages/SettingWokspace';
import FormWorkspace from './pages/FormWorkspace';
import BotScreen from './components/BotScreen';
import Analytics from './pages/Analytics';
import { Theme } from './pages/Theme';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/workspace" element={<ProtectedRoute element={UserWorkspacePage} />} />
        <Route path="/settings" element={<ProtectedRoute element={SettingWorkspace} />} />
        <Route path="/form" element={<ProtectedRoute element={FormWorkspace} />} />
        <Route path="/form/:id" element={<ProtectedRoute element={FormWorkspace} />} />
        <Route path="/forms/public/:shareableLink" element={<BotScreen />} />
        <Route path="/forms/public/:id" element={<BotScreen/>} /> 
        <Route path="/analytics/:shareableLink" element={<Analytics/>} />
        <Route path="/theme/:id" element={<Theme />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;

