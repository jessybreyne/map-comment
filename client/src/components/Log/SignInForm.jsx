import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}/api/user/login`,
            withCredentials: true,
            data: {
                email,
                password
            }
        })
            .then((res) => {
                if (res.data.errors) {
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                } else {
                    emailError.innerHTML = "";
                    passwordError.innerHTML = "";
                    window.location = '/';
                }
            }).catch((err) => { console.log(err) })
    };

    return (
        <Form action="" onSubmit={handleLogin} id="sign-up-form">
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} value={email} />
            </Form.Group>
            <div className="email error"></div>
            <br />
            <Form.Group controlId="password">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </Form.Group>
            <div className="password error"></div>
            <br />
            <Button variant="primary" type="submit">
                Se connecter
            </Button>
        </Form>
    )
}

export default SignInForm