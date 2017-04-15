import React from 'react'
import Icon from './Icon'
import 'react-slide-animation/lib/index.css';
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
        content: React.PropTypes.array.isRequired,
        /**
         * Menu level.  Must be zero or higher.
         */
        level: React.PropTypes.number.isRequired,
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
        content: React.PropTypes.array.isRequired,
        /**
         * Function to determine if the path is active.
         */
        isPathActive: React.PropTypes.func.isRequired,
        /**
         * Side nav is visible
         */
        visible: React.PropTypes.bool.isRequired
    }
    render() {
        return (<nav className="sidebar col-sm-3 col-md-2 hidden-xs-down bg-faded" role="navigaton">
            <MenuGroup level={0} path={[]} content={this.props.content} isPathActive={this.props.isPathActive} />
        </nav>)
    }
}
