import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink,
    withRouter
} from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

import './SideMenu.scss'
import Icon from './Icon'
import { updateNavActivePath } from './redux/actions'

class MenuItem extends React.Component {
    constructor(props) {
        super(props)
    }
    isActive() {
        const activePath = this.props.sideMenuActivePath
        if (activePath === undefined) {
            return false
        }
        for (let i = 0; i < this.props.path.length; ++i) {

            if (activePath[i] != this.props.path[i]) {
                return false
            }
        }
        return true
    }
    render() {
        // Determine if this path is active
        const active = this.isActive()
        let icon = null
        if (this.props.data.icon) {
            icon = <Icon name={this.props.data.icon} fw={true} />
        }
        let toggle = null
        let menuGroup = null
        let groupActiveClass = null
        let activeClass = null
        if (this.props.group && active) {
            toggle = <span className="fa arrow"></span>
            groupActiveClass = "active"
            menuGroup = this.props.group
        } else if (this.props.group && !active) {
            toggle = <span className="fa arrow"></span>
        } else if (!this.props.group && active) {
            activeClass = "active"
        }
        if (!this.props.data.to && this.props.data.content && this.props.data.content[0].to) {
            // Then this will create a link to the first element
            let to = this.props.data.content[0].to
            return (
                <li>
                    <Link to={to}>{icon} {this.props.data.label}{toggle}</Link>
                    {menuGroup}
                </li>
            )

        } else if (!this.props.data.to) {
            return (
                <li>
                    <a className={activeClass} href="#" onClick={this.handleClick}>{icon} {this.props.data.label}{toggle}</a>
                    {menuGroup}
                </li>
            )

        } else if (this.props.data.externalLink) {
            return (
                <li>
                    <a href={this.props.data.to}>{icon} {this.props.data.label}{toggle}</a>
                    {menuGroup}
                </li>
            )
        } else {
            return (
                <li>
                    <NavLink activeClassName="active" exact to={this.props.data.to}>{icon} {this.props.data.label}{toggle}</NavLink>
                    {menuGroup}
                </li>
            )
        }

    }
}
MenuItem.propTypes = {
    /**
     * Menu item data.
     */
    data: React.PropTypes.object.isRequired,
    /**
     * Path. This is an array of indices that would indicate the path to the menu group or item.
     */
    path: React.PropTypes.array.isRequired
}

/**
 * @todo add callback to determine whether to show the item or not.
 */
class MenuGroup extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let items = []
        this.props.content.forEach((elem, i) => {
            let path = this.props.path.slice(0)
            path.push(i)
            if (elem.content) {
                let group = <MenuGroup content={elem.content} level={this.props.level + 1} menu={this.props.menu} path={path} />
                items.push(<VisibleMenuItem key={i} data={elem} group={group} path={path} />)
            } else {
                items.push(<VisibleMenuItem key={i} data={elem} path={path} />)
            }
        })
        return (
            <ReactCSSTransitionGroup
                transitionName="menugroup"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}>
                <ul className={this.props.menu.classes[this.props.level].join(' ')}>
                    {items}
                </ul>
            </ReactCSSTransitionGroup >
        )
    }
}
MenuGroup.propTypes = {
    /**
     * Menu contents
     */
    content: React.PropTypes.array.isRequired,
    /**
     * Menu level.  Must be zero or higher.
     */
    level: React.PropTypes.number.isRequired,
    /**
     * The menu.  This contains the classes to be rendered for each group level.
     */
    menu: React.PropTypes.object.isRequired,
    /**
     * Path. This is an array of indices that would indicate the path to the menu group or item.
     */
    path: React.PropTypes.array.isRequired,
}

/**
 * The Side Menu
 */
class SideMenu extends React.Component {
    constructor(props) {
        super(props)

        this.classes = props.classes ||
            [
                ['nav'],
                ['nav', 'nav-second-level'],
                ['nav', 'nav-third-level']
            ]
        this.pathToRoutes = this.determinePathToRoutesFromContent(props.content, [])

    }
    componentDidMount() {
        this.props.onRouteChange(this.pathToRoutes[location.pathname])
        this.unlisten = this.props.history.listen((location, action) => {
            if (action === "PUSH") {
                this.props.onRouteChange(this.pathToRoutes[location.pathname])
            }

        })
    }
    componentWillUnmount() {
        this.unlisten()
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
        return <div id={this.props.id}>
            <MenuGroup content={this.props.content} level={0} path={[]} menu={this} />
        </div>
    }

    render2() {
        return <ul className={this.classes[0].join(' ')} id={this.props.id}>
            <li>
                <a href="index.html"><Icon name="dashboard" fw="true" /> Dashboard</a>
            </li>
            <li>
                <a href="#"><Icon name="bar-chart-o" fw="true" /> Charts<span className="fa arrow"></span></a>
                <ul className={this.classes[1].join(' ')}>
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
                <ul className={this.classes[1].join(' ')}>
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
                <ul className={this.classes[1].join(' ')}>
                    <li>
                        <a href="#">Second Level Item</a>
                    </li>
                    <li>
                        <a href="#">Second Level Item</a>
                    </li>
                    <li>
                        <a href="#">Third Level <span className="fa arrow"></span></a>
                        <ul className={this.classes[2].join(' ')}>
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
                <a href="#"><Icon name="files-o" fw="true" /> Sample Pages<span className="fa arrow"></span></a>
                <ul className={this.classes[1].join(' ')}>
                    <li>
                        <a className="active" href="blank.html"><Icon name="files-o" fw="true" /> Blank Page</a>
                    </li>
                    <li>
                        <a href="login.html">Login Page</a>
                    </li>
                </ul>
            </li>
        </ul>
    }
}
SideMenu.propTypes = {
    /**
     * Menu contents
     */
    content: React.PropTypes.array.isRequired,
    /**
     * Array of class values for the `ul` element depending on the level in the menu.  If not specified, it will use the class names used by sb-admin-2
     */
    classes: React.PropTypes.array
}
const VisibleMenuItem = connect(
    (state) => {
        return { sideMenuActivePath: state.sideMenuActivePath }
    }
)(MenuItem)

const RoutedSideMenu = connect(
    (state) => {
        return { sideMenuActivePath: state.sideMenuActivePath }
    },
    (dispatch) => {
        return {
            onRouteChange: (newActivePath) => {
                dispatch(updateNavActivePath(newActivePath))
            }
        }
    })(withRouter(SideMenu))

export default RoutedSideMenu