import React, { useState } from 'react'
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { Row, Col, Button, Container } from 'react-bootstrap';

function Log(props) {
    const [signUpModal, setSignUpModal] = useState(props.signup);
    const [signInModal, setSignInModal] = useState(props.signin);

    const handleModals = (e) => {
        if (e.target.id === "register") {
            setSignInModal(false);
            setSignUpModal(true);
        } else if (e.target.id === "login") {
            setSignInModal(true);
            setSignUpModal(false);
        }
    }

    return (
        <>
            <Container>
                <Row className="mt-5 mb-4">
                    <Col>
                        <Button onClick={handleModals} id="register" variant="success" size="lg" block>S'inscrire</Button>
                    </Col>
                    <Col>
                        <Button onClick={handleModals} id="login" variant="outline-success" size="lg" block>Se connecter</Button>
                    </Col>
                </Row>
                {signUpModal && <SignUpForm />}
                {signInModal && <SignInForm />}
            </Container>
        </>
    )
}

export default Log
