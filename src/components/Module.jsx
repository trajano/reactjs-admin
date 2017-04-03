/**
 * In terms of design, this is the entry point for the framework and should not try to access anything else above this tree.
 */
import React from 'react'
import ReactDOM from 'react-dom'

import 'bootstrap'
import 'font-awesome-webpack'

import {
    Router,
    Route,
    Redirect,
    Link,
    NavLink,
    withRouter
} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory()

import './app.scss'
import SideMenu from './SideMenu'

/**
 * Module configuration.  This must be an EcmaScript object rather than a
 * JSON file, because it can contain ReactJS components and functions.
 * @typedef {Object} ModuleConfig
 * @property {string|function} basename base name (if a function is provided then the basename is calculated from the given function)
 * @property {Object[]} content menu content
 * @property {Object} notFoundComponent component to render when the path was not found.
 */

/**
 * @typedef {Object} ModuleState
 * @property {number[]} activePath
 */

const MyWorld = (props) => (<div>My world</div>)
const MyHome = (props) => (<div>My home</div>)
/**
 * @typedef {Object} MenuItem
 * @property {boolean} externalLink whether the link is external (i.e. not a route)
 * @property {string} label label (TODO remove this eventually and make it i18n)
 * @property {string} to route (should be unique)
 * @property {object} component component
 * @property {string[]} aliases aliases (should also be unique)
 */
class Module extends React.Component {
    static propTypes = {
        /**
         * Module configuration
         */
        config: React.PropTypes.object.isRequired
    }
    constructor(props) {
        super(props)
        this.isPathActive = this.isPathActive.bind(this)
    }
    componentWillMount() {
        this.routes = this.determineRoutesFromContent(this.props.config.content)
        this.pathToRoutes = this.determinePathToRoutesFromContent(this.props.config.content, [])
        this.history = createBrowserHistory({
            basename: ((typeof this.props.config.basename === "function") ? this.props.config.basename() : this.props.config.basename) || ""
        })

        /** @type {ModuleState} */
        this.state = {
            activePath: []
        }
    }

    isPathActive(pathForLink) {
        for (let i = 0; i < pathForLink.length; ++i) {

            if (i >= this.state.activePath.length || this.state.activePath[i] != pathForLink[i]) {
                return false
            }
        }
        return true
    }

    componentDidMount() {
        this.setState({ activePath: this.pathToRoutes[location.pathname] })

        this.unlisten = this.history.listen((location, action) => {
            if (action === "PUSH") {
                this.setState({ activePath: this.pathToRoutes[location.pathname] || [] })
            }
        })
    }

    componentWillUnmount() {
        this.unlisten()
    }

    /**
     * This will recursively scan the content array to determine and generate Routes.
     * @todo rename to reduceRouteConfiguration
     * @param {MenuItem[]} content menu content array
     * @returns {Array} of Routes
     */
    determineRoutesFromContent(content) {
        let routes = []
        content.forEach((elem, i) => {
            if (elem.content) {
                routes.push(...this.determineRoutesFromContent(elem.content))
            }
            if (!elem.externalLink && elem.to && elem.component) {
                routes.push(<Route key={elem.to} exact path={elem.to} component={elem.component} />)
                elem.aliases && elem.aliases.forEach(alias => {
                    routes.push(<Route key={alias} exact path={alias} render={() => <Redirect to={elem.to} />} />)
                })
            }
        })
        return routes
    }
    /**
     * This will recursively scan the content array to determine and activation paths
     * @param {MenuItem[]} content menu content array
     * @param {number[]} parentPath parent path
     * @returns {object} route path to activation path map
     */
    determinePathToRoutesFromContent(content, parentPath) {
        let routes = {}
        content.forEach((elem, i) => {
            let currentPath = parentPath.slice(0)
            currentPath.push(i)
            if (elem.content) {
                Object.assign(routes, this.determinePathToRoutesFromContent(elem.content, currentPath))
            }
            if (!elem.externalLink && elem.to && elem.component) {
                routes[elem.to] = currentPath
            }
        })
        return routes
    }
    render() {
        return <Router history={this.history}>
            <div id="wrapper">
                <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{ marginBottom: 0 }}>
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="index.html">SB Admin v2.0</a>
                    </div>

                    <ul className="nav navbar-top-links navbar-right">
                        <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                                <i className="fa fa-envelope fa-fw"></i> <i className="fa fa-caret-down"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-messages">
                                <li>
                                    <a href="#">
                                        <div>
                                            <strong>John Smith</strong>
                                            <span className="pull-right text-muted">
                                                <em>Yesterday</em>
                                            </span>
                                        </div>
                                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="#">
                                        <div>
                                            <strong>John Smith</strong>
                                            <span className="pull-right text-muted">
                                                <em>Yesterday</em>
                                            </span>
                                        </div>
                                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="#">
                                        <div>
                                            <strong>John Smith</strong>
                                            <span className="pull-right text-muted">
                                                <em>Yesterday</em>
                                            </span>
                                        </div>
                                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a className="text-center" href="#">
                                        <strong>Read All Messages</strong>
                                        <i className="fa fa-angle-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                                <i className="fa fa-tasks fa-fw"></i> <i className="fa fa-caret-down"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-tasks">
                                <li>
                                    <a href="#">
                                        <div>
                                            <p>
                                                <strong>Task 1</strong>
                                                <span className="pull-right text-muted">40% Complete</span>
                                            </p>
                                            <div className="progress progress-striped active">
                                                <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"
                                                    style={{ width: "40%" }}>
                                                    <span className="sr-only">40% Complete (success)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="#">
                                        <div>
                                            <p>
                                                <strong>Task 2</strong>
                                                <span className="pull-right text-muted">20% Complete</span>
                                            </p>
                                            <div className="progress progress-striped active">
                                                <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"
                                                    style={{ width: "20%" }}>>
                                            <span className="sr-only">20% Complete</span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="#">
                                        <div>
                                            <p>
                                                <strong>Task 3</strong>
                                                <span className="pull-right text-muted">60% Complete</span>
                                            </p>
                                            <div className="progress progress-striped active">
                                                <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                                    style={{ width: "60%" }}>
                                                    <span className="sr-only">60% Complete (warning)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="#">
                                        <div>
                                            <p>
                                                <strong>Task 4</strong>
                                                <span className="pull-right text-muted">80% Complete</span>
                                            </p>
                                            <div className="progress progress-striped active">
                                                <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"
                                                    style={{ width: "80%" }}>
                                                    <span className="sr-only">80% Complete (danger)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a className="text-center" href="#">
                                        <strong>See All Tasks</strong>
                                        <i className="fa fa-angle-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                                <i className="fa fa-bell fa-fw"></i> <i className="fa fa-caret-down"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-alerts">
                                <li>
                                    <a href="#">
                                        <div>
                                            <i className="fa fa-comment fa-fw"></i> New Comment
                                    <span className="pull-right text-muted small">4 minutes ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="#">
                                        <div>
                                            <i className="fa fa-twitter fa-fw"></i> 3 New Followers
                                    <span className="pull-right text-muted small">12 minutes ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="#">
                                        <div>
                                            <i className="fa fa-envelope fa-fw"></i> Message Sent
                                    <span className="pull-right text-muted small">4 minutes ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="#">
                                        <div>
                                            <i className="fa fa-tasks fa-fw"></i> New Task
                                    <span className="pull-right text-muted small">4 minutes ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="#">
                                        <div>
                                            <i className="fa fa-upload fa-fw"></i> Server Rebooted
                                    <span className="pull-right text-muted small">4 minutes ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a className="text-center" href="#">
                                        <strong>See All Alerts</strong>
                                        <i className="fa fa-angle-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                                <i className="fa fa-user fa-fw"></i> <i className="fa fa-caret-down"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-user">
                                <li><a href="#"><i className="fa fa-user fa-fw"></i> User Profile</a>
                                </li>
                                <li><a href="#"><i className="fa fa-gear fa-fw"></i> Settings</a>
                                </li>
                                <li className="divider"></li>
                                <li><a href="login.html"><i className="fa fa-sign-out fa-fw"></i> Logout</a>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <div className="navbar-default sidebar" role="navigation">
                        <div className="sidebar-nav navbar-collapse">
                            <ul className="nav">
                                <li className="sidebar-search">
                                    <div className="input-group custom-search-form">
                                        <input type="text" className="form-control" placeholder="Search..." />
                                        <span className="input-group-btn">
                                            <button className="btn btn-default" type="button">
                                                <i className="fa fa-search"></i>
                                            </button>
                                        </span>
                                    </div>
                                </li>
                            </ul>
                            <SideMenu content={this.props.config.content} isPathActive={this.isPathActive} />
                        </div>
                    </div>
                </nav>

                <div id="page-wrapper">
                    {this.routes}
                </div>

            </div>
        </Router>
    }
}

/**
 * Bootstrap the application
 * @param {ModuleConfig} config configuration for the module
 * @param {Object|function} modules 
 */
export function bootstrap(config, modules) {
    ReactDOM.render(<Module config={config} />,
        document.getElementById("app"))
}

