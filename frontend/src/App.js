import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service.js";

import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Home from "./components/Home.js";
import Profile from "./components/Profile.js";
import BoardUser from "./components/BoardUser.js";
/*import BoardModerator from "./components/BoardModerator.js";
import BoardAdmin from "./components/BoardAdmin.js";*/

const App = () => {
 /* const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);*/
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      /*setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));*/
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
      <div>
        <div className="container d-flex justify-content-center">
          <img
              src="logo.png"
              alt="logo-img"/>
        </div>
          {currentUser && (
        <nav className="navbar navbar-expand navbar-dark navbar-main">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link text-white">
                Home
              </Link>
            </li>

            {/*{showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Moderator Board
                  </Link>
                </li>
            )}

            {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
            )}*/}

            {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link text-white">
                    User
                  </Link>
                </li>
            )}
          </div>

          {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link text-white">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link text-white" onClick={logOut}>
                    LogOut
                  </a>
                </li>
              </div>
          ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link text-white">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link text-white">
                    Sign Up
                  </Link>
                </li>
              </div>
          )}
        </nav>
          )}

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/user" element={<BoardUser/>} />
            {/*<Route path="/mod" element={<BoardModerator/>} />
            <Route path="/admin" element={<BoardAdmin/>} />*/}
          </Routes>
        </div>
      </div>
  );
};

export default App;
