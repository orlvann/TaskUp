import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddBord from '../Components/ProjectManageBoard/AddBord';
import BordList from '../Components/ProjectManageBoard/BordList';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const alldata = useSelector((state) => state);

  useEffect(() => {
    const savedBoards = JSON.parse(localStorage.getItem('boards')) || [];
    localStorage.setItem('manageState', JSON.stringify(alldata));
  }, [alldata]);

  return (
    <div className='App bg-gradient-to-r from-cyan-900 to-indigo-900 w-full min-h-screen'>
      <AddBord />
      <BordList />
    </div>
  );
}

export default App;
