import React, { useState, useRef } from "react";
import { useNavigate,Routes, Route, Link } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service.js";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

function Login() {
    let navigate = useNavigate();

    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(username, password).then(
                () => {
                    navigate("/profile");
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
               {/* <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />*/}

                <Form onSubmit={handleLogin} ref={form}>
                    <div className="form-group">
                        <Input
                            type="text"
                            className="form-control input-border"
                            name="username"
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required]}
                            placeholder="Username"
                        />
                    </div>

                    <div className="form-group">
                        <Input
                            type="password"
                            className="form-control input-border"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                            placeholder="Password"
                        />
                    </div>

                    <div className="form-group m-4">
                        <button className="btn btn-block btn-dark-blue" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                    <div className="container d-flex flex-column justify-content-center">
                        <div className="m-3 d-flex justify-content-center link-forgot">
                            Forgot your password?
                        </div>
                        <Link to={"/register"} className="m-3 d-flex justify-content-center link-registration">
                            Registrieren
                        </Link>

                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    );
};

export default Login;