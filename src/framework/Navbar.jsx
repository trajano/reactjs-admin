import React from 'react'
import PropTypes from 'prop-types'
import {
    Link
} from 'react-router-dom'
import onClickOutside from 'react-onclickoutside'

import SlideAnimation from 'react-slide-animation'
import Icon from './Icon'
import { enableUniqueIds } from 'react-html-id'

class InternalDropdown extends React.Component {
    static propTypes = {
        icon: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        open: PropTypes.bool
    }
    constructor(props) {
        super(props)
        enableUniqueIds(this)
        this.state = { open: false }
        this.toggleOpen = this.toggleOpen.bind(this)
    }
    toggleOpen(e) {
        e.preventDefault()
        this.setState(({ open }) => ({ open: !open }))
    }
    handleClickOutside(e) {
        if (this.state.open) {
            this.setState({ open: false })
        }
    }
    render() {
        let className = "nav-link"
        if (this.state.open) {
            className = "nav-link active"
        }
        let dropdownContents = [<a key="toggle"
            className={className} href="#"
            onClick={this.toggleOpen}
            id={this.nextUniqueId()}
            title={this.props.title}
            aria-haspopup="true"
            aria-expanded={this.state.open}><Icon name={this.props.icon} fw /></a>]
        if (this.state.open) {
            dropdownContents.push(<div key="menu" className="dropdown-menu dropdown-menu-right" aria-labelledby={this.lastUniqueId()}>
                {this.props.children}
            </div>)
        }

        return <SlideAnimation component="span" className="nav-item dropdown show">
            {dropdownContents}
        </SlideAnimation>
    }
}

const Dropdown = onClickOutside(InternalDropdown)

class DebugIcon extends React.PureComponent {
    render() {
        if (this.props.show) {
            return <li className="nav-item dropdown show"><a className="nav-link">
                <span className="hidden-md-up hidden-xs-down">sm</span>
                <span className="hidden-lg-up hidden-sm-down">md</span>
                <span className="hidden-xl-up hidden-md-down">lg</span>
                <span className="hidden-lg-down">xl</span>
            </a></li>
        } else {
            return null
        }
    }
}

/**
 * This provides the navigation bar of the framework.  The navigation bar 
 * consists of an icon/toggle, title and notification icons.  The brand title
 * disappears for sm or smaller.  In its place a home icon will appear along
 * with the other notification icons.
 * 
 * There are 
 */
export default class Navbar extends React.Component {
    static propTypes = {
        /**
         * Module title
         */
        title: PropTypes.string.isRequired,
        /**
         * Module logo
         */
        title: PropTypes.string.isRequired,
        toggleSideNav: PropTypes.func.isRequired,
        /**
         * If true, then the small device navigation navbar is shown.
         */
        smallDeviceNavigation: PropTypes.bool.isRequired
    }
    constructor(props) {
        super(props)
        this.state = {
            messagesDropdownOpen: false,
            tasksDropdownOpen: false,
            alertsDropdownOpen: false,
            userDropdownOpen: false
        }
        this.toggleMessagesDropdown = this.toggleMessagesDropdown.bind(this)
        this.toggleUserDropdown = this.toggleUserDropdown.bind(this)
    }

    toggleOpen(event, eventDetails) {
        let open = !this.props.open;

        if (open) {
            this.lastOpenEventType = eventDetails.source;
        }
        console.log("HERE")
    }

    toggleMessagesDropdown(e) {
        e.preventDefault()
        this.setState(({ messagesDropdownOpen }) => ({
            messagesDropdownOpen: !messagesDropdownOpen,
            tasksDropdownOpen: false,
            alertsDropdownOpen: false,
            userDropdownOpen: false
        }))
    }

    toggleUserDropdown(e) {
        e.preventDefault()
        this.setState(({ userDropdownOpen }) => ({
            messagesDropdownOpen: false,
            tasksDropdownOpen: false,
            alertsDropdownOpen: false,
            userDropdownOpen: !userDropdownOpen
        }))
    }

    render() {
        let leftside = <Link className="navbar-brand" to="/"><img src={this.props.logo} srcSet={this.props.logo.srcSet} alt="" />{this.props.title}</Link>
        let rightside = <div className="navbar-nav">
            <Dropdown icon="envelope" title="Messages" defaultOpen={false}>
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
            </Dropdown>
            <Dropdown icon="tasks" title="Tasks">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
            </Dropdown>
            <Dropdown icon="bell" title="Alerts">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
            </Dropdown>
            <Dropdown icon="user" title="User Settings">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Sign Out</a>
            </Dropdown>
            <DebugIcon show={!this.props.smallDeviceNavigation} />
        </div>

        if (this.props.smallDeviceNavigation) {
            leftside = <button type="button" className="navbar-toggler navbar-toggler-left" aria-label="Toggle Navigation" onClick={this.props.toggleSideNav}>
                <span className="navbar-toggler-icon"></span>
            </button>
            rightside = <div className="navbar-nav">
                <Link to="/messages" title="Messages" className="nav-link"><Icon name="envelope" /></Link>
                <Link to="/tasks" title="Tasks" className="nav-link"><Icon name="tasks" /></Link>
                <Link to="/alerts" title="Alerts" className="nav-link"><Icon name="bell" /></Link>
                <Dropdown icon="user" title="User Settings">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Sign Out</a>
                </Dropdown>
                <DebugIcon show={!this.props.smallDeviceNavigation} />
            </div>
        }

        return (<nav className="navbar navbar-light bg-faded fixed-top" role="toolbar">
            {leftside}
            {rightside}
        </nav>)
    }
}
