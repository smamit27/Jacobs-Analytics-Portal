import './App.css';
import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import Jacobs from '../src/components/views/Jacobs'
import { getAuthenticationDetails,getNotifications } from './redux/common/action'


function App(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    ///dispatch(getAuthenticationDetails())
  
    dispatch(getNotifications())
  }, [])

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Jacobs />
      </Suspense>
    </div>
  );
}

export default App;
