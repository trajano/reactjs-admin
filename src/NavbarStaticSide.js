import React from 'react'

import {
    Link
} from 'react-router-dom'

// TODO refactor this out
const Icon = props => {
    let classes = ["fa"]
    classes.push("fa-" + props.name)
    if (props.fw) {
        classes.push("fa-fw")
    }
    classes = classes.join(" ")
    return (<i className={classes}></i>)
}

const NavElement = props => {
    if (props.to && props.icon) {
        return (<li key={props}><Link to={props.to}><Icon name={props.icon} fw={true} /> {props.label}</Link></li>)
    } else if (props.to && !props.icon) {
        return (<li key={props}><Link to={props.to}>{props.label}</Link></li>)
    } else if (props.to && props.icon) {
        return (<li key={props}><a href="#"><Icon name={props.icon} fw={true} /> {props.label}</a></li>)
    } else {
        return (<li key={props}><a href="#">{props.label}</a></li>)
    }
}

function transformHierarchyToNavElementsSecondLevel(hierarchy) {
    let navElements = []
    hierarchy.forEach(elem => {
        if (elem.items) {
            // do third level
        } else {
            navElements.push(<NavElement key={elem} to={elem.to} label={elem.label} icon={elem.icon} />)
        }
    })
    return navElements
}
function transformHierarchyToNavElements(hierarchy) {
    let navElements = []
    hierarchy.forEach(elem => {
        if (elem.items) {
            const secondLevelNavElements = transformHierarchyToNavElementsSecondLevel(elem.items)
            if (!elem.to && elem.icon) {
                navElements.push(<li key={elem}>
                    <a href="#"><Icon name={elem.icon} fw={true} /> {elem.label}<span className="fa arrow"></span></a>
                    <ul className="nav nav-second-level">
                        {secondLevelNavElements}
                    </ul>
                </li>
                )
            } else if (elem.to && elem.icon) {
                navElements.push(<li key={elem}>
                    <Link to={elem.to}><Icon name={elem.icon} fw={true} /> {elem.label}<span className="fa arrow"></span></Link>
                    <ul className="nav nav-second-level">
                        <li>
                            <Link to="/flot">Flot Charts</Link>
                        </li>
                        <li>
                            <a href="morris.html">Morris.js Charts</a>
                        </li>
                    </ul>
                </li>
                )
            }
        } else {
            navElements.push(<NavElement to={elem.to} label={elem.label} icon={elem.icon} />)
        }
    })
    return navElements
}
const NavbarStaticSide = props => {
    const navElements = transformHierarchyToNavElements(props.hierarchy)
    // transform props.hierachy to navElelements
    return (
        <div className="navbar-default sidebar" role="navigation">
            <div className="sidebar-nav navbar-collapse">
                <ul className="nav" id="side-menu">
                    <li className="sidebar-search">
                    </li>
                    {navElements}
                    <li>
                        <a href="#"><i className="fa fa-bar-chart-o fa-fw"></i> Charts<span className="fa arrow"></span></a>
                        <ul className="nav nav-second-level">
                            <li>
                                <Link to="/flot">Flot Charts</Link>
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
                    <li>
                        <a href="#"><i className="fa fa-files-o fa-fw"></i> Sample Pages<span className="fa arrow"></span></a>
                        <ul className="nav nav-second-level">
                            <li>
                                <Link to="/blank">Blank Page</Link>
                            </li>
                            <li>
                                <a href="login.html">Login Page</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NavbarStaticSide
