/**
 * In terms of design, this is the entry point for the framework and should not try to access anything else above this tree.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
    Router
} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import Navbar from './Navbar'
import SideNav from './SideNav'
import ContentSwitcher from './ContentSwitcher'

class Module extends React.Component {
    static propTypes = {
        /**
         * Module configuration
         */
        config: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.isPathActive = this.isPathActive.bind(this)
        this.onSideNavLinkClick = this.onSideNavLinkClick.bind(this)
        this.toggleSideNav = this.toggleSideNav.bind(this)
        this.updateStatesBasedOnWindowSize = this.updateStatesBasedOnWindowSize.bind(this)
        this.state = {
            activePath: [],
            smallDeviceNavigation: false,
            sideNavVisible: true
        }
    }

    componentWillMount() {
        this.pathToRoutes = this.determinePathToRoutesFromContent(this.props.config.content, [])
        this.history = createBrowserHistory({
            basename: ((typeof this.props.config.basename === "function") ? this.props.config.basename() : this.props.config.basename) || ""
        })

        this.updateStatesBasedOnWindowSize()
    }

    componentDidMount() {
        this.setState({ activePath: this.pathToRoutes[location.pathname] })

        this.unlisten = this.history.listen((location, action) => {
            if (action === "PUSH") {
                const newActivePath = this.pathToRoutes[location.pathname]
                if (newActivePath === undefined) {
                    this.setState({ activePath: [] })
                } else {
                    this.setState({ activePath: newActivePath })
                }
            }
        })
        document.title = this.props.config.title
        window.addEventListener("resize", this.updateStatesBasedOnWindowSize)
    }

    componentWillUnmount() {
        this.unlisten()
        window.removeEventListener("resize", this.updateStatesBasedOnWindowSize)
    }

    /**
     * This will trigger a state change based on the device size.
     */
    updateStatesBasedOnWindowSize() {

        const w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            width = w.innerWidth || documentElement.clientWidth || body.clientWidth
        // height = w.innerHeight || documentElement.clientHeight || body.clientHeight
        if (width >= 576) {
            if (this.state.smallDeviceNavigation) {
                this.setState({ smallDeviceNavigation: false })
            }
            if (!this.state.sideNavVisible) {
                this.setState({ sideNavVisible: true })
            }
        } else {
            if (!this.state.smallDeviceNavigation) {
                // Force hide the side nav if the smallDeviceNavigation was false before.
                this.setState({ sideNavVisible: false })
            }
            if (!this.state.smallDeviceNavigation) {
                this.setState({ smallDeviceNavigation: true })
            }
        }
    }

    isPathActive(pathForLink) {
        if (this.state.activePath === undefined) {
            return false
        }
        for (let i = 0; i < pathForLink.length; ++i) {

            if (i >= this.state.activePath.length || this.state.activePath[i] != pathForLink[i]) {
                return false
            }
        }
        return true
    }
    /**
     * Toggles the side nav for smaller screens.
     */
    toggleSideNav() {
        this.setState(({ sideNavVisible }) => ({ sideNavVisible: !sideNavVisible }))
    }

    /**
     * When the side nav link is clicked and smallDeviceNavigation state is true then set the result to false otherwise set it to true.
     */
    onSideNavLinkClick() {
        if (this.state.smallDeviceNavigation) {
            this.setState({ sideNavVisible: false })
        }
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
        return <Router history={this.history}>
            <div>
                <Navbar title={this.props.config.title} smallDeviceNavigation={this.state.smallDeviceNavigation} logo={this.props.config.logo} toggleSideNav={this.toggleSideNav} />
                <div className="container-fluid">
                    <div className="row">
                        <SideNav key="sideNav" content={this.props.config.content} visible={this.state.sideNavVisible} isPathActive={this.isPathActive} onLinkClick={this.onSideNavLinkClick} />
                        <ContentSwitcher key="content" content={this.props.config.content} sideNavVisible={this.state.sideNavVisible} notFoundComponent={this.props.config.notFoundComponent} />
                    </div>
                </div>
                <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                ...
      </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    }
}

export default Module
