import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Home from './components/Home';

function App() {


  return (
    <>
      <Header/>
      <NavBar/>
       <Routes>
        <Route path="/" element={<Home/>} />
       </Routes>
    </>
  )
}

export default App
