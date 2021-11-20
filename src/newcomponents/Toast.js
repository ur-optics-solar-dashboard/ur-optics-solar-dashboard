import './Toast.css';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Alert } from 'react-bootstrap';

const ToastAlert = (props) => {

    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant={props.category} dismissible onClose={() => setShow(false)}>{props.message}</Alert>
        );
    } else {
    return (<></>);
    }
}

const Toast = () => {

    const [toastList, setToastList] = useState([]);

    useEffect(() => {
        window.addEventListener('toast', (e) => {
            setToastList([...toastList, { message: e.detail.message, category: e.detail.category, id: uuidv4() }]);
        });
    }, [toastList]);

    return (
        <ul class="toast-container">
            {toastList.map((item) => (
                // <Alert key={item.id} variant={item.category} dismissible onClose={this.setState({show:false})}>{item.message}</Alert>
                <ToastAlert key={item.id} message={item.message} category={item.category} />
            ))}
        </ul>
    );
}

export default Toast;