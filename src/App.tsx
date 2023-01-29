import React, { useEffect } from 'react';
import './App.css';
import PostList from './components/PostList';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Profile from './components/Profile';
import SignIn from './components/SignIn';
import { useTypedSelector } from './hooks/useTypedSelector';
import { Navigate } from 'react-router-dom'
import useUserActions from './hooks/useUserActions';
import SignUp from './components/SignUp';
import Analytics from './components/Analytics';
import Chat from './components/Chat';

function App() {
  const { loading, user } = useTypedSelector(state => state.user)
  const { userData } = useUserActions()

  useEffect(() => {
    let login = JSON.parse(localStorage.getItem('user') || '{}')
    if(login[0] !== undefined && Object.keys(user).length > 0){
      userData(login[0].username, login[0].password)
    }
  }, [])

  const ProtectedComponent = () => {
    if (Object.keys(user).length === 0)
      return <Navigate to='/signin' />
    return <PostList byWhat={{type: 'DEFAULT'}}></PostList>
  }

  const ProtectedSign = () => {
    if (Object.keys(user).length !== 0)
      return <Navigate to='/' />
    return <SignIn></SignIn>
  }

  if (loading) {
    return <h1>Loading App</h1>
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<ProtectedComponent></ProtectedComponent>}></Route>
          <Route path='/analytics' element={<Analytics></Analytics>}></Route>
          <Route path='/profile/:id' element={<Profile></Profile>}></Route>
          <Route path='/category/:id' element={<Profile></Profile>}></Route>
          <Route path='/content/:id' element={<PostList byWhat={{type: 'BY_POST_ID'}}></PostList>}></Route>
          <Route path='/search/:name' element={<Profile></Profile>}></Route>
          <Route path='/create_post' element={<Profile></Profile>}></Route>
          <Route path='/signup' element={<SignUp></SignUp>}></Route>
          <Route path='/signin' element={<ProtectedSign></ProtectedSign>}></Route>
          <Route path='/chat' element={<Chat></Chat>}></Route>
          <Route path='*' element={<ProtectedSign></ProtectedSign>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
