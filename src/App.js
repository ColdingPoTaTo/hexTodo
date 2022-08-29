import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import TodoPage from './TodoPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/SignupPage" element={<SignupPage />} />
        <Route path="/TodoPage" element={<TodoPage />} />
        <Route path="/*" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
