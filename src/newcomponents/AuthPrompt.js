import './AuthPrompt.css';
import { Button } from 'react-bootstrap';

const AuthPrompt = (props) => {
    return (
        <>
            <div className="auth-prompt-wrapper">
                <p className="auth-prompt-text">You must log in with your Box account to view and download sensor data.</p>
                <Button onClick={ () => { window.location.href = 'http://localhost:5000/get_box_auth_url'} }>Login with Box</Button>
            </div>
        </>
    );
}

export default AuthPrompt;