import React from 'react'
import PropTypes from 'prop-types'
import {
    Route,
    Switch
} from 'react-router-dom'

/**
 * This switches between contents based on the route.  It will assemble the routes from the configuration.
 */
export default class ContentSwitcher extends React.Component {
    static propTypes = {
        /**
         * Menu contents
         */
        content: PropTypes.array.isRequired,
        /**
         * Component to render when the URL is not found.
         */
        notFoundComponent: PropTypes.func,
        showModal: PropTypes.func
    }

    componentWillMount() {
        this.routes = this.reduceRouteConfiguration(this.props.content)
    }
    /**
     * This will recursively scan the content array to determine and generate Routes.
     * @todo rename to reduceRouteConfiguration
     * @param {MenuItem[]} content menu content array
     * @returns {Array} of Routes
     */
    reduceRouteConfiguration(content) {
        let routes = []
        content.forEach((elem, i) => {
            if (elem.content) {
                routes.push(...this.reduceRouteConfiguration(elem.content))
            }
            if (!elem.externalLink && elem.to && elem.component) {
                const MyComponent = elem.component
                routes.push(<Route key={elem.to} exact path={elem.to} component={(props) => <MyComponent {...props} showModal={this.props.showModal} />} />)
                elem.aliases && elem.aliases.forEach(alias => {
                    routes.push(<Route key={alias} exact path={alias} render={() => <Redirect to={elem.to} />} />)
                })
            }
        })
        return routes
    }

    render() {
        const Messages = this.props.messagesComponent
        const Tasks = this.props.tasksComponent
        const Alerts = this.props.alertsComponent
        return (<main className="col-sm-8 offset-sm-4 col-md-8 offset-md-4 col-lg-9 offset-lg-3 col-xl-10 offset-xl-2 pt-3" role="main">
            <Switch>
                {this.routes}
                <Route exact path="/messages" component={(props) => <Messages {...this.props} showModal={this.props.showModal} />} />
                <Route exact path="/tasks" component={(props) => <Tasks {...this.props} showModal={this.props.showModal} />} />
                <Route exact path="/alerts" component={(props) => <Alerts {...this.props} showModal={this.props.showModal} />} />
                <Route component={this.props.notFoundComponent} />
            </Switch>
        </main>)
    }
}

