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

    let sliceMin = toastList.length - 6;
    let sliceMax = toastList.length;
    if (sliceMin < 0) { sliceMin = 0; }

    return (
        <ul className="toast-container">
            {toastList.slice(sliceMin, sliceMax).map((item) => (
                <ToastAlert key={item.id} message={item.message} category={item.category} />
            ))}
            { (toastCount > 5) ? //prevent huge amounts of toasts
                <ToastAlert key={-1} message={"+" + (toastCount - 5) + " more messages"} category="warning" />
                : <></>
            }
        </ul>
    );
}

export default Toast;