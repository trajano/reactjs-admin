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
        this.state = {
            active: -1
        }
    }
    render() {
        let icon = null;
        if (this.props.data.icon) {
            icon = <Icon name={this.props.data.icon} fw={true} />
        }
        if (!this.props.data.to) {
            return (
                <li>
                    <a href="#">{icon}{this.props.data.label}</a>
                </li>
            )
        } else if (this.props.data.externalLink) {
            return (
                <li>
                    <a href={this.props.data.to}>{icon}{this.props.data.label}</a>
                </li>
            )
        } else {
            return (
                <li>
                    <Link to={this.props.data.to}>{icon}{this.props.data.label}</Link>
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
}
class MenuGroup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: -1
        }
    }
    render() {
        let items = []
        this.props.content.forEach((elem, i) => {
            const key = `m${this.props.level},${i}`
            items.push(<MenuItem key={key} data={elem} />)
        })
        return (
            <ul className={this.props.classes[this.props.level].join(' ')}>
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
     * Array of class values for the `ul` element depending on the level in the menu.
     */
    classes: React.PropTypes.array.isRequired
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

        // for each entry in content create a row to add to the menu group
        // in addition calculate the key.

    }

    render() {
        return <div id={this.props.id}>
            <MenuGroup content={this.props.content} level={0} classes={this.classes} />
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