import './AuthRedirectSpinner.css';
import { Spinner } from 'react-bootstrap';

const AuthRedirectSpinner = () => {
    return (
        <>
            <div className="auth-redirect-spinner-container">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <br />
                <p>Completing Box authentication.</p>
                <p>You will be redirected shortly.</p>
            </div>
        </>
    )
}

export default AuthRedirectSpinner;