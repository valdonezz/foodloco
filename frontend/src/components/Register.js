import React, { useState, useRef } from "react";
import Form from "react-validation/build/form.js";
import Input from "react-validation/build/input.js";
import CheckButton from "react-validation/build/button.js";
import { isEmail } from "validator";

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

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const Register = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.register(username, email, password).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        }
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <Form onSubmit={handleRegister} ref={form}>
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <Input
                                    type="text"
                                    className="form-control input-border"
                                    name="username"
                                    value={username}
                                    onChange={onChangeUsername}
                                    validations={[required, vusername]}
                                    placeholder="Username"
                                />
                            </div>

                            <div className="form-group">
                                <Input
                                    type="text"
                                    className="form-control input-border"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[required, validEmail]}
                                    placeholder="Email"
                                />
                            </div>

                            <div className="form-group">

                                <Input
                                    type="password"
                                    className="form-control input-border"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required, vpassword]}
                                    placeholder="Password"
                                />
                            </div>

                            <div className="form-group m-4">
                                <button className="btn btn-block btn-dark-blue">Sign Up</button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div
                                className={ successful ? "alert alert-success" : "alert alert-danger" }
                                role="alert"
                            >
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

export default Register;


