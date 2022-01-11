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
    const [toastCount, setToastCount] = useState(0);

    useEffect(() => {

        const handleToast = (e) => {
            setToastList([...toastList, { message: e.detail.message, category: e.detail.category, id: uuidv4() }]);
            setToastCount(toastCount + 1);
        }

        window.addEventListener('toast', handleToast);

        return () => {
            window.removeEventListener('toast', handleToast);
        }

    }, [toastList, toastCount]);

    return (
        <ul className="toast-container">
            {toastList.slice(0, 4).map((item) => (
                <ToastAlert key={item.id} message={item.message} category={item.category} />
            ))}
            { (toastCount > 4) ? //prevent huge amounts of toasts
                <ToastAlert key={-1} message={"+" + (toastCount - 4) + " more messages"} category="warning" />
                : <></>
            }
        </ul>
    );
}

export default Toast;