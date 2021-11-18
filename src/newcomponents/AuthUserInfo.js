import { Alert, ProgressBar, Button } from "react-bootstrap";
import { clearAuthToken } from "../Utils";

const AuthUserInfo = (props) => {

    const logout = () => {
        clearAuthToken();
        window.location.href = '/';
    }

    return (
        <>
            <Alert variant="success">You are authenticated with Box</Alert>
            <h1>{props.name}</h1>
            <h6>{props.email}</h6>
            <br />
            <p>Box storage usage:</p>
            <ProgressBar now={(props.space_used/props.space_total) * 100}/>
            <br />
            <br />
            <Button variant="primary" onClick={ logout }>Logout</Button>
        </>
    )
}

export default AuthUserInfo;