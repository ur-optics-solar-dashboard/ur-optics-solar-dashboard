import '../App.css';

import 'react-pro-sidebar/dist/css/styles.css';

import SidebarLayout from '../newcomponents/SidebarLayout';

import { useState, useEffect } from 'react';
import { getBoxAllCSVs } from '../Utils';

const BoxTest = () => {

    const [boxCSVs, setBoxCSVS] = useState([]);

    useEffect(() => {
        getCSVs();
    }, []);

    const getCSVs = async () => {
        console.log('doing getCSVs');
        getBoxAllCSVs()
            .then(result => setBoxCSVS(result));
    }

    return (
        <>
        <SidebarLayout width={290}>
            <p><b>CSVs in Box:</b></p>
            <ul>
                {boxCSVs.map((item) => (
                    <li>{item}</li>
                ))}
            </ul>
        </SidebarLayout>
        </>
    );

}

export default BoxTest;