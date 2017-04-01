import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import Icon from './Icon'

class MenuItem extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(e) {
        console.log(this.props.menu.state)
        console.log(this.props.path)
        this.props.menu.setState({ something: this.props.data.label })
    }
    render() {
        let icon = null
        if (this.props.data.icon) {
            icon = <Icon name={this.props.data.icon} fw={true} />
        }
        let toggle = null
        let menuGroup = null
        let groupActiveClass = null
        let activeClass = null
        if (this.props.group) {
            toggle = <span className="fa arrow"></span>
            menuGroup = this.props.group
        }
        if (this.props.group && this.props.active) {
            groupActiveClass = "active"
        } else if (this.props.active) {
            activeClass = "active"
        }
        if (!this.props.data.to) {
            return (
                <li className={groupActiveClass}>
                    <a className={activeClass} href="#" onClick={this.handleClick}>{icon}{this.props.data.label}{toggle}</a>
                    {menuGroup}
                </li>
            )
        } else if (this.props.data.externalLink) {
            return (
                <li className={groupActiveClass}>
                    <a className={activeClass} href={this.props.data.to}>{icon}{this.props.data.label}{toggle}</a>
                    {menuGroup}
                </li>
            )
        } else {
            return (
                <li className={groupActiveClass}>
                    <Link className={activeClass} to={this.props.data.to}>{icon}{this.props.data.label}{toggle}</Link>
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
     * The menu.  This contains the top level state data that will be updated by the items here.
     */
    menu: React.PropTypes.object.isRequired,
    /**
     * Active indicator.
     */
    active: React.PropTypes.bool.isRequired
}
class MenuGroup extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let items = []
        this.props.content.forEach((elem, i) => {
            let path = this.props.path.slice(0)
            path.push(i)
            const active = this.props.active && (this.props.activePath.length > this.props.level && this.props.activePath[this.props.level] == i)
            if (elem.content) {
                let group = <MenuGroup content={elem.content} level={this.props.level + 1} activePath={this.props.activePath} active={active} menu={this.props.menu} path={path} />
                items.push(<MenuItem key={i} data={elem} group={group} active={active} menu={this.props.menu} path={path} />)
            } else {
                items.push(<MenuItem key={i} data={elem} active={active} menu={this.props.menu} path={path} />)
            }
        })
        return (
            <ul className={this.props.menu.classes[this.props.level].join(' ')}>
                {items}
            </ul>
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
     * The menu.  This contains the top level state data that will be updated by the items here.
     */
    menu: React.PropTypes.object.isRequired,
    /**
     * Active path array.   This is an array of indices to each content and level to determine if it is active or not.
     * @deprecated use the one in menu
     */
    activePath: React.PropTypes.array.isRequired,
    /**
     * Path. This is an array of indices that would indicate the path to the menu group or item.
     */
    path: React.PropTypes.array.isRequired,
    /**
     * Active indicator.
     * @deprecated calculate this one
     */
    active: React.PropTypes.bool.isRequired
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

        this.state = { activePath: [0] }

    }

    componentWillMount() {
        // Find out what is active when first mounted.  This should be based on the location.  This will set the activePath state.
        this.setState({ activePath: [3, 0] })
    }

    render() {
        return <div id={this.props.id}>
            <MenuGroup content={this.props.content} level={0} classes={this.classes} activePath={this.state.activePath} active={true} path={[]} menu={this} />
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
export default SideMenu