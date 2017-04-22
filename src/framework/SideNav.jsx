import React from 'react'
import PropTypes from 'prop-types'
import Icon from './Icon'
import SlideAnimation from 'react-slide-animation'
import {
    Link,
    NavLink
} from 'react-router-dom'

/**
 * Menu group for the side menu scomponent.
 */
class MenuGroup extends React.PureComponent {
    static propTypes = {
        /**
         * Menu contents
         */
        content: PropTypes.array.isRequired,
        /**
         * Menu level.  Must be zero or higher.
         */
        level: PropTypes.number.isRequired,
        /**
         * Path. This is an array of indices that would indicate the path to the menu group or item.
         */
        path: PropTypes.array.isRequired,
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
            const pathActive = this.props.isPathActive(path)
            if (elem.content) {
                toggle = <span className="fa arrow"></span>
                if (pathActive) {
                    menuGroup = <MenuGroup content={elem.content} level={this.props.level + 1} classes={this.props.classes} path={path} isPathActive={this.props.isPathActive} />
                    groupActiveClass = "active"
                }
            }

            if (elem.to !== undefined && !elem.externalLink) {
                items.push(<li key={i + groupActiveClass} className={groupActiveClass}>
                    <NavLink exact to={elem.to}
                        activeClassName="active"
                        onClick={this.props.onClick}
                        aria-expanded={pathActive}>{toggle}{icon} {elem.label}</NavLink>
                    {menuGroup}
                </li>)
            } else if (elem.to !== undefined && elem.externalLink) {
                items.push(<li key={i + groupActiveClass} className={groupActiveClass}>
                    <a href={elem.to} aria-expanded={pathActive}>{toggle}{icon} {elem.label}</a>
                    {menuGroup}
                </li>)
            } else if (elem.to === undefined && elem.content && elem.content[0] && elem.content[0].to !== undefined && !elem.content[0].externalLink) {
                items.push(<li key={i + groupActiveClass} className={groupActiveClass}>
                    <Link to={elem.content[0].to} aria-expanded={pathActive}>{toggle}{icon} {elem.label}</Link>
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
            component="ul" className="nav">
            {items}
        </SlideAnimation>
    }
}

export default class SideNav extends React.Component {
    static propTypes = {
        /**
         * Menu content
         */
        content: PropTypes.array.isRequired,
        /**
         * Function to determine if the path is active.
         */
        isPathActive: PropTypes.func.isRequired,
        /**
         * If this is true then the side nav will make itself hidden.
         */
        hideOnSelect: PropTypes.bool,
        /**
         * Side nav is visible
         */
        visible: PropTypes.bool.isRequired
    }
    render() {
        let item = []
        if (this.props.visible) {
            item = [<nav key="nav" className="sidebar" role="navigation">
                <MenuGroup level={0} path={[]} content={this.props.content} isPathActive={this.props.isPathActive}/>
            </nav>]
        }
        return <SlideAnimation>
            {item}
        </SlideAnimation>
    }
}
