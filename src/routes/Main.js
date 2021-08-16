
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';

// import { colourOptions } from '../data';

import '../App.css';
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa"

import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";

import 'react-pro-sidebar/dist/css/styles.css';

import solarIcon from '../images/solar-icon.svg';
import { FaGem, FaHeart } from 'react-icons/fa';

const IrridianceOptions = [
    { value: 'irradiance-global-horizontal', label: 'Global Horizontal', color: '#00B8D9' },
    { value: 'irradiance-direct-normal', label: 'Direct Normal', color: '#0052CC' },
    { value: 'irradiance-diffuse-horizontal', label: 'Diffuse Horizontal', color: '#5243AA' },
];

const Main = () => {
    return (
        <>
            <div className="sidebar">
                <ProSidebar>
                    <Menu iconShape="square">
                        <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
                        <SubMenu title="Components" icon={<FaHeart />}>
                            <MenuItem>Component 1</MenuItem>
                            <MenuItem>Component 2</MenuItem>
                        </SubMenu>
                    </Menu>
                </ProSidebar>
            </div>
            <main className="content">
                <Select
                    options={IrridianceOptions}>

                </Select>
                <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </h1>
                <h1>Iusto ipsum accusamus vero recusandae! </h1>
                <h1>Aperiam, molestias autem dicta fugit alias neque eum deleniti cupiditate, </h1>
                <h1>minus unde culpa harum veniam nulla. Impedit.</h1>
                <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </h1>
                <h1>Iusto ipsum accusamus vero recusandae! </h1>
                <h1>Aperiam, molestias autem dicta fugit alias neque eum deleniti cupiditate, </h1>
                <h1>minus unde culpa harum veniam nulla. Impedit.</h1>
                <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </h1>
                <h1>Iusto ipsum accusamus vero recusandae! </h1>
                <h1>Aperiam, molestias autem dicta fugit alias neque eum deleniti cupiditate, </h1>
                <h1>minus unde culpa harum veniam nulla. Impedit.</h1>
                \<h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </h1>
                <h1>Iusto ipsum accusamus vero recusandae! </h1>
                <h1>Aperiam, molestias autem dicta fugit alias neque eum deleniti cupiditate, </h1>
                <h1>minus unde culpa harum veniam nulla. Impedit.</h1>
                <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </h1>
                <h1>Iusto ipsum accusamus vero recusandae! </h1>
                <h1>Aperiam, molestias autem dicta fugit alias neque eum deleniti cupiditate, </h1>
                <h1>minus unde culpa harum veniam nulla. Impedit.</h1>
                <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </h1>
                <h1>Iusto ipsum accusamus vero recusandae! </h1>
                <h1>Aperiam, molestias autem dicta fugit alias neque eum deleniti cupiditate, </h1>
                <h1>minus unde culpa harum veniam nulla. Impedit.</h1>

            </main>
        </>
    )
}

export default Main
