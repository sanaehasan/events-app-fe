import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import UserContext from './UserContext';
import { useState } from 'react';
import { userType } from './userType';
import Register from './components/Register';
import Event from './components/Event';
import AddEvent from './components/AddEvent';
import EditEvent from './components/EditEvent';
import Profile from './components/Profile';

function App() {

const [user,setUser] = useState<userType|null>(null)
  
  return (
    <UserContext.Provider value={{user,setUser}} >
      <Header/>
       <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/event/:event_id" element={<Event/>}/>
        <Route path= "/event" element={<AddEvent/>} />
         <Route path= "/edit-event/:event_id" element={<EditEvent/>} />
       </Routes>
    </UserContext.Provider>
  )
}

export default App
