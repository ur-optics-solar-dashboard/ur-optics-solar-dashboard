import '../App.css';

import 'react-pro-sidebar/dist/css/styles.css';

import SidebarLayout from '../newcomponents/SidebarLayout';
import Toast from '../newcomponents/Toast';

const About = () => {
    
    return (
        <>
        <SidebarLayout width={290}>
            <h1>Flux Solar Dashboard</h1>
            <p>Developed by <a href="https://roclab.io">RocLab</a> for the University of Rochester Optics Department.</p>
            <br /><br /><p>idk what else to put on this page</p>
            <Toast />
        </SidebarLayout>
        </>
    )
}

export default About;