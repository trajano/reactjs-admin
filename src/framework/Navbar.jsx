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
            return (<nav className="navbar navbar-toggleable-xs navbar-light bg-faded fixed-top" role="navigation">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/"><img src={this.props.logo} height="20" srcSet={this.props.logo.srcSet} />{this.props.title}</Link>
                </div>
            </nav>)
        }
    }
}
export default Navbar
