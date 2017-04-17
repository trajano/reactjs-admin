import React from 'react'
import PropTypes from 'prop-types'
import {
    Link
} from 'react-router-dom'

import SlideAnimation from 'react-slide-animation'
import Icon from './Icon'

class Dropdown extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        open: PropTypes.bool.isRequired,
        onDropdownClick: PropTypes.func.isRequired
    }
    render() {
        let dropdownContents = [<a key="toggle" className="nav-link" href="#" onClick={this.props.onDropdownClick} id={this.props.id} aria-haspopup="true" aria-expanded={this.props.open}><Icon name={this.props.icon} fw /></a>]
        if (this.props.open) {
            dropdownContents.push(<div key="menu" className="dropdown-menu dropdown-menu-right" aria-labelledby={this.props.id}>
                {this.props.children}
            </div>)
        }

        return <SlideAnimation component="li" className="nav-item dropdown show">
            {dropdownContents}
        </SlideAnimation>
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
    //                <div className="collapse navbar-collapse" >
    //                

    //              </div>
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
        if (this.props.smallDeviceNavigation) {
            leftside = (<button type="button" className="navbar-toggler navbar-toggler-left" aria-label="Toggle navigation" onClick={this.props.toggleSideNav}>
                <span className="navbar-toggler-icon"></span>
            </button>)
        }
        let userDropdownContents = [<a key="toggle" className="nav-link" href="#" onClick={this.toggleUserDropdown} id="userDropDownMenuLink" aria-haspopup="true" aria-expanded={this.state.userDropdownOpen}><Icon name="user" fw /></a>]
        if (this.state.userDropdownOpen) {
            userDropdownContents.push(<div key="menu" className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropDownMenuLink">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
            </div>)
        }

        let userDropdown2 = <SlideAnimation component="li" className="nav-item dropdown show">
            {userDropdownContents}
        </SlideAnimation>

        return (<nav className="navbar navbar-light navbar-toggleable bg-faded fixed-top" role="navigation">
            {leftside}
            <ul className="navbar-nav">
                <li className="nav-item dropdown">
                    <a className="nav-link" href="#" id="messagesDropDownMenuLink" aria-haspopup="true" aria-expanded={this.state.messagesDropdownOpen}><Icon name="envelope" fw /></a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link" href="#" id="tasksDropDownMenuLink" aria-haspopup="true" aria-expanded={this.state.tasksDropdownOpen}><Icon name="tasks" fw /></a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link" href="#" id="alertDropDownMenuLink" aria-haspopup="true" aria-expanded={this.state.alertDropdownOpen}><Icon name="bell" fw /></a>
                </li>
                <Dropdown id="userDropDownMenuLink" open={this.state.userDropdownOpen} onDropdownClick={this.toggleUserDropdown} icon="user">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                </Dropdown>
            </ul>
        </nav>)
    }
    render2() {
        if (this.props.smallDeviceNavigation) {
            return (<nav className="navbar navbar-light bg-faded fixed-top" role="navigation">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggler navbar-toggler-left" aria-label="Toggle navigation" onClick={this.props.toggleSideNav}>
                        <span className="navbar-toggler-icon"></span></button>
                    <div className="pull-right">
                        <span className="pull-right"><a className="nav-link" href="#"><Icon name="user" fw /></a>
                        </span>
                        <span className="pull-right"><a className="nav-link" href="#"><Icon name="comment" fw /></a>
                        </span>
                        <span className="pull-right"><a className="nav-link" href="#"><Icon name="tasks" fw /></a>
                        </span>
                        <span className="pull-right"><a className="nav-link" href="#"><Icon name="envelope" fw /></a></span>
                    </div>
                </div>
            </nav>)
        } else {
            return (<nav className="navbar navbar-light bg-faded fixed-top" role="navigation">
                <div className="navbar-header">
                    <Link className="navbar-brand mr-auto" to="/"><img src={this.props.logo} srcSet={this.props.logo.srcSet} alt="" />{this.props.title}</Link>
                    <div className="pull-right">
                        <span className="pull-right"><a className="nav-link" href="#"><Icon name="user" fw /></a>
                        </span>
                        <span className="pull-right"><a className="nav-link" href="#"><Icon name="comment" fw /></a>
                        </span>
                        <span className="pull-right"><a className="nav-link" href="#"><Icon name="tasks" fw /></a>
                        </span>
                        <span className="pull-right"><a className="nav-link" href="#"><Icon name="envelope" fw /></a></span>
                    </div>
                </div>
            </nav>)
        }
    }
}
