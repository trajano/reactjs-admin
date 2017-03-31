import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import Icon from './Icon'


class SideMenu extends React.Component {
    render() {
        return <ul className="nav" id="side-menu">
            <li>
                <a href="index.html"><Icon name="dashboard" fw="true" /> Dashboard</a>
            </li>
            <li>
                <a href="#"><Icon name="bar-chart-o" fw="true" /> Charts<span className="fa arrow"></span></a>
                <ul className="nav nav-second-level">
                    <li>
                        <a href="flot.html">Flot Charts</a>
                    </li>
                    <li>
                        <a href="morris.html">Morris.js Charts</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="tables.html"><i className="fa fa-table fa-fw"></i> Tables</a>
            </li>
            <li>
                <a href="forms.html"><i className="fa fa-edit fa-fw"></i> Forms</a>
            </li>
            <li>
                <a href="#"><i className="fa fa-wrench fa-fw"></i> UI Elements<span className="fa arrow"></span></a>
                <ul className="nav nav-second-level">
                    <li>
                        <a href="panels-wells.html">Panels and Wells</a>
                    </li>
                    <li>
                        <a href="buttons.html">Buttons</a>
                    </li>
                    <li>
                        <a href="notifications.html">Notifications</a>
                    </li>
                    <li>
                        <a href="typography.html">Typography</a>
                    </li>
                    <li>
                        <a href="icons.html"> Icons</a>
                    </li>
                    <li>
                        <a href="grid.html">Grid</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#"><i className="fa fa-sitemap fa-fw"></i> Multi-Level Dropdown<span className="fa arrow"></span></a>
                <ul className="nav nav-second-level">
                    <li>
                        <a href="#">Second Level Item</a>
                    </li>
                    <li>
                        <a href="#">Second Level Item</a>
                    </li>
                    <li>
                        <a href="#">Third Level <span className="fa arrow"></span></a>
                        <ul className="nav nav-third-level">
                            <li>
                                <a href="#">Third Level Item</a>
                            </li>
                            <li>
                                <a href="#">Third Level Item</a>
                            </li>
                            <li>
                                <a href="#">Third Level Item</a>
                            </li>
                            <li>
                                <a href="#">Third Level Item</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li className="active">
                <a href="#"><Icon name="files-o" fw="true"/> Sample Pages<span className="fa arrow"></span></a>
                <ul className="nav nav-second-level">
                    <li>
                        <a className="active" href="blank.html"><Icon name="files-o" fw="true"/> Blank Page</a>
                    </li>
                    <li>
                        <a href="login.html">Login Page</a>
                    </li>
                </ul>
            </li>
        </ul>
    }
}
export default SideMenu