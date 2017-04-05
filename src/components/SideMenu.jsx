import React from 'react'
import {
    Link,
    NavLink
} from 'react-router-dom'
import SlideAnimation from 'react-slide-animation'
import Icon from './Icon'

/**
 * Menu group for the side menu scomponent.
 */
class MenuGroup extends React.PureComponent {
    static propTypes = {
        /**
         * Menu contents
         */
        content: React.PropTypes.array.isRequired,
        /**
         * Menu level.  Must be zero or higher.
         */
        level: React.PropTypes.number.isRequired,
        /**
         * Classes for each level.
         */
        classes: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.string)).isRequired,
        /**
         * Path. This is an array of indices that would indicate the path to the menu group or item.
         */
        path: React.PropTypes.array.isRequired,
    }
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    /**
     * Prevent default behaviour when clicking on a "#" link.
     */
    handleClick(e) {
        e.preventDefault()
    }
    render() {
        let items = []
        this.props.content.forEach((elem, i) => {
            let path = this.props.path.slice(0)
            path.push(i)
            let icon = null
            if (elem.icon) {
                icon = <Icon name={elem.icon} fw />
            }
            let menuGroup = null
            let toggle = null
            let groupActiveClass = null
            if (elem.content) {
                toggle = <span className="fa arrow"></span>
                if (this.props.isPathActive(path)) {
                    menuGroup = <MenuGroup content={elem.content} level={this.props.level + 1} classes={this.props.classes} path={path} isPathActive={this.props.isPathActive} />
                    groupActiveClass = "active"
                }
            }

            if (elem.to !== undefined && !elem.externalLink) {
                items.push(<li key={i + groupActiveClass} className={groupActiveClass}>
                    <NavLink exact to={elem.to} activeClassName="active">{icon} {elem.label}{toggle}</NavLink>
                    {menuGroup}
                </li>)
            } else if (elem.to !== undefined && elem.externalLink) {
                items.push(<li key={i + groupActiveClass} className={groupActiveClass}>
                    <a href={elem.to}>{icon} {elem.label}{toggle}</a>
                    {menuGroup}
                </li>)
            } else if (elem.to === undefined && elem.content && elem.content[0] && elem.content[0].to !== undefined && !elem.content[0].externalLink) {
                items.push(<li key={i + groupActiveClass} className={groupActiveClass}>
                    <Link to={elem.content[0].to}>{icon} {elem.label}{toggle}</Link>
                    {menuGroup}
                </li>)
            } else {
                items.push(<li key={i + groupActiveClass} className={groupActiveClass}>
                    <a href="#" onClick={this.handleClick}>{icon} {elem.label}</a>
                    {menuGroup}
                </li>)
            }
        })
        return <SlideAnimation
            component="ul" className={this.props.classes[this.props.level].join(' ')}>
            {items}
        </SlideAnimation>
    }
}

/**
 * The Side Menu
 */
class SideMenu extends React.Component {
    static propTypes = {
        /**
         * Menu contents
         */
        content: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        /**
         * Array of class values for the `ul` element depending on the level in the menu.  If not specified, it will use the class names used by sb-admin-2
         */
        classes: React.PropTypes.array
    }
    constructor(props) {
        super(props)

        this.classes = props.classes ||
            [
                ['nav'],
                ['nav', 'nav-second-level'],
                ['nav', 'nav-third-level']
            ]

    }
    render() {
        return <MenuGroup content={this.props.content} level={0} path={[]} classes={this.classes} isPathActive={this.props.isPathActive} />
    }
}

export default SideMenu