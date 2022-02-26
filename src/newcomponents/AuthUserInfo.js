import { Alert, ProgressBar, Button } from "react-bootstrap";
import { clearAuthToken } from "../Utils";
import { useHistory } from "react-router-dom";

const AuthUserInfo = (props) => {
    const history = useHistory();

    const logout = () => {
        clearAuthToken();
        history.push("/");
    }

    return (
        <>
            <Alert variant="success">You are authenticated with Box.</Alert>
            <h1>{props.name}</h1>
            <h6>{props.email}</h6>
            <br />
            <p>Box storage usage:</p>
            <ProgressBar now={(props.space_used/props.space_total) * 100}/>
            <br />
            <br />
            <Button variant="primary" onClick={ logout }>Logout</Button>
            <br />
            <br />
            <p>In some cases, Box authentication may expire. If data retrieval is not working, logout and sign in with Box again.</p>
        </>
    )
}

export default AuthUserInfo;