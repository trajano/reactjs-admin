import React from 'react'
import {
    Link
} from 'react-router-dom'

import Icon from './Icon'

/**
 * This provides the navigation bar of the framework.  The navigation bar 
 * consists of an icon/toggle, title and notification icons.  The brand title
 * disappears for sm or smaller.  In its place a home icon will appear along
 * with the other notification icons.
 * 
 * There are 
 */
class Navbar extends React.Component {
    static propTypes = {
        /**
         * Module title
         */
        title: React.PropTypes.string.isRequired,
        /**
         * Module logo
         */
        title: React.PropTypes.string.isRequired,
        /**
         * If true, then the small device navigation navbar is shown.
         */
        smallDeviceNavigation: React.PropTypes.bool.isRequired
    }
    render() {
        if (this.props.smallDeviceNavigation) {
            return (<nav className="navbar navbar-toggleable-xs navbar-light bg-faded fixed-top" role="navigation">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggler navbar-toggler-left" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span></button>
                </div>
            </nav>)
        } else {
            return (<nav className="navbar navbar-toggleable-md navbar-light bg-faded fixed-top" role="navigation">
                <Link className="navbar-brand" to="/"><img src={this.props.logo} srcSet={this.props.logo.srcSet} />{this.props.title}</Link>
                <a className="nav-link ml-auto justify-content-end" href="#"><Icon name="envelope" fw /></a>
                <a className="nav-link justify-content-end" href="#"><Icon name="tasks" fw /></a>
                <a className="nav-link justify-content-end" href="#"><Icon name="comment" fw /></a>
                <a className="nav-link justify-content-end" href="#"><Icon name="user" fw /></a>
            </nav>)
        }
    }
    /*

<nav class="nav ml-auto justify-content-end">
                <a className="nav-link  " href="#"><Icon name="dashboard" fw /></a>
</nav >
                <button className="nav-item p-2 justify-content-end btn "><Icon name="phone" fw /></button>
                    <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Active</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Disabled</a>
                    </li>
                </ul>
*/
    /*<nav className="nav justify-content-end">
      <a className="nav-link active" href="#">Active</a>
      <a className="nav-link" href="#">Link</a>
      <a className="nav-link" href="#">Link</a>
      <a className="nav-link disabled" href="#">Disabled</a>
    </nav>*/
    //                    <a className="nav-link ml-auto nav-item p-2 justify-content-end btn " href="#"><Icon name="dashboard" fw /></a>
    //                  <button className="nav-item p-2 justify-content-end btn "><Icon name="phone" fw /></button>

}
export default Navbar
