import React, { useState } from 'react';
import axios from 'axios';
import SignInForm from './SignInForm';
import { Form, Button } from 'react-bootstrap';

function SignUpForm() {
    const [formSubmit, setFormSubmit] = useState(false);
    const [email, setEmail] = useState('');
    const [first_name, setFirstname] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const terms = document.getElementById("terms");
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");
        const passwordConfirmError = document.querySelector(".password-confirm.error");
        const termsError = document.querySelector(".terms.error");

        passwordConfirmError.innerHTML = "";
        termsError.innerHTML = "";

        if (password !== controlPassword || !terms.checked) {
            if (password !== controlPassword) {
                passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";
            }
            if (!terms.checked) {
                termsError.innerHTML = "Veuillez valider les conditionds générales";
            }
        } else {
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}/api/user/register`,
                data: {
                    first_name,
                    email,
                    password
                }
            })
                .then((res) => {
                    if (res.data.errors) {
                        emailError.innerHTML = res.data.errors.email;
                        passwordError.innerHTML = res.data.errors.password;
                    } else {
                        setFormSubmit(true);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <>
            {formSubmit ? (
                <>
                    <SignInForm/>
                    <spans></spans>
                    <h4 className="success">Enregistrement réussi, veuillez vous connecter</h4>
                </>
            ) : (
                <Form action="" onSubmit={handleRegister} id="sign-up-form">

                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </Form.Group>
                    <div className="email error"></div>
                    <br/>

                    <Form.Group controlId="firstnam">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control type="text" placeholder="" onChange={(e) => setFirstname(e.target.value)} value={first_name} />
                    </Form.Group>
                    <div className="firstname error"></div>
                    <br/>

                    <Form.Group controlId="password">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control type="password" placeholder="" onChange={(e) => setPassword(e.target.value)} value={password} />
                    </Form.Group>
                    <div className="password error"></div>
                    <br/>

                    <Form.Group controlId="password-conf">
                        <Form.Label>Confirmation du mot de passe</Form.Label>
                        <Form.Control type="password" placeholder="" onChange={(e) => setControlPassword(e.target.value)} value={controlPassword} />
                    </Form.Group>
                    <div className="password-confirm error"></div>
                    <br/>

                    <input type="checkbox" id="terms"/>
                    <label htmlFor="terms">J'accepte les <a href="/" target="_blank" rel="noopener noreferrer">conditions générales</a></label>
                    <div className="terms error"></div>
                    <br/>

                    <Button variant="success" type="submit">
                        S'inscrire
                    </Button>
                </Form>
            )}
        </>
    )
}

export default SignUpForm
