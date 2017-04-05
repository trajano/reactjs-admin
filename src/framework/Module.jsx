/**
 * In terms of design, this is the entry point for the framework and should not try to access anything else above this tree.
 */
import React from 'react'
import {
    Router
} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import Navbar from './Navbar'
// import SideNav from './SideNav'
// import ContentSwitcher from './ContentSwitcher'

const SideNav = () => (<div id="side-nav" />)
const ContentSwitcher = () => (<div id="page-wrapper"><h1>HTML Ipsum Presents</h1>

    <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>

    <h2>Header Level 2</h2>

    <ol>
        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
        <li>Aliquam tincidunt mauris eu risus.</li>
    </ol>

    <blockquote><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</p></blockquote>

    <h3>Header Level 3</h3>

    <ul>
        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
        <li>Aliquam tincidunt mauris eu risus.</li>
    </ul>

</div>)

class Module extends React.Component {
    static propTypes = {
        /**
         * Module configuration
         */
        config: React.PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.isPathActive = this.isPathActive.bind(this)
        this.updateDeviceSize = this.updateDeviceSize.bind(this)
    }

    componentWillMount() {
        this.pathToRoutes = this.determinePathToRoutesFromContent(this.props.config.content, [])
        this.history = createBrowserHistory({
            basename: ((typeof this.props.config.basename === "function") ? this.props.config.basename() : this.props.config.basename) || ""
        })

        /** @type {ModuleState} */
        this.state = {
            activePath: []
        }
        this.updateDeviceSize();
    }

    /**
     * This will trigger a state change based on the state.
     */
    updateDeviceSize() {

        const w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            width = w.innerWidth || documentElement.clientWidth || body.clientWidth
        // height = w.innerHeight || documentElement.clientHeight || body.clientHeight

        let deviceSize = 'xs'
        if (width >= 1200) {
            deviceSize = 'xl'
        } else if (width >= 992) {
            deviceSize = 'lg'
        } else if (width >= 768) {
            deviceSize = 'md'
        } else if (width >= 567) {
            deviceSize = 'sm'
        }
        this.setState((prevState) => {
            if (prevState.deviceSize != deviceSize) {
                return {
                    deviceSize
                }
            } else {
                return null
            }
        })
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
        window.addEventListener("resize", this.updateDeviceSize)
    }

    componentWillUnmount() {
        this.unlisten()
        window.removeEventListener("resize", this.updateDeviceSize)
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
            <div className="container">
                <Navbar title={this.props.config.title} deviceSize={this.state.deviceSize} />
                <SideNav deviceSize={this.state.deviceSize} sideNavVisisble={this.state.sideNavVisisble} />
                <ContentSwitcher deviceSize={this.state.deviceSize} sideNavVisisble={this.state.sideNavVisisble} />
            </div>
        </Router>
    }
}

export default Module
