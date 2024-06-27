import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import LoginPage from './components/login/LoginPage';
import reportWebVitals from './reportWebVitals';
import LandingPage from './components/landingPage/Landing';
import SignUpPage from './components/signUpPage/SignUpPage';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export default function Index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/app" element={<App/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
      </Routes>
    </BrowserRouter>
  );
}
root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);

reportWebVitals();
