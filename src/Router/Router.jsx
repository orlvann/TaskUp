import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../App/App';
import List from '../Components/ProjectManageBoard/List';
import WhiteBoard from '../Components/WhiteBoard/WhiteBoard';
import TaskListPage from '../Components/TaskList/TaskListPage';
import HomePage from '../Components/Home/HomePage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/WhiteBoard' element={<WhiteBoard />} />
        <Route path='/:bordId' element={<List />} />
        <Route path='/TaskListPage' element={<TaskListPage />} />
        <Route path='/HomePage' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
