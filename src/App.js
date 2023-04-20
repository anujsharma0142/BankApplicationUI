import './App.css';
import { BrowserRouter as Router,Routes,Route,Link, BrowserRouter} from 'react-router-dom';
import Login from './Components/Login/login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import RouteLogin from './Components/PrivateRoute/RouteLogin';
import Nav from './Nav';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route exact path="/" element={<RouteLogin/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/home" element={<PrivateRoute/>}>
        <Route path="" element={<Nav/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

