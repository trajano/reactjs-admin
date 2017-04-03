import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import Icon from './components/Icon'
import { bootstrap } from './components/Module'

import MyBlank from './myapp/Blank'
import Index from './myapp/Index'
import SamplePages from './myapp/SamplePages'
import SecondPage from './myapp/SecondPage'
import ThirdLevelItem from './myapp/ThirdLevelItem'
import FourOhFour from './myapp/FourOhFour'

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
)

const About = () => (
    <div>
        <h2>About</h2>
    </div>
)

const Topics = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    Rendering with React
        </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    Components
        </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    Props v. State
        </Link>
            </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic} />
        <Route exact path={match.url} render={() => (
            <h3>Please select a topic.</h3>
        )} />
    </div>
)

const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
)

const BasicExample = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/topics">Topics</Link></li>
            </ul>

            <hr />

            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topics} />

            <hr />
        </div>
    </Router>
)


/** @type {ModuleConfig} */
const moduleConfig = {
    basename: () => {
        if (location.host === "trajano.github.io") {
            return "/reactjs-admin"
        } else {
            return ""
        }
    },
    notFoundComponent: FourOhFour,
    content: [
        {
            icon: 'dashboard',
            to: '/',
            component: Index,
            aliases: ['/index.html'],
            label: 'Dashboard'
        },
        {
            icon: 'bar-chart-o',
            label: 'Charts',
            content: [
                {
                    to: '/flot.html',
                    label: 'Flot Charts',
                    component: ThirdLevelItem
                },
                {
                    to: '/morris.html',
                    label: 'Morris.js Charts',
                    component: ThirdLevelItem
                }

            ]
        },
        {
            icon: 'sitemap',
            label: 'Multi-Level Dropdown',
            content: [
                {
                    label: 'Second Level Item',
                    to: '/s1',
                    aliases: ['/index2.html'],
                    component: ThirdLevelItem
                },
                {
                    label: 'Second Level Item',
                    to: '/s2',
                    component: ThirdLevelItem
                },
                {
                    label: 'Third Level',
                    content: [
                        {
                            label: 'Third Level Item',
                            to: '/t1',
                            component: ThirdLevelItem,
                        },
                        {
                            label: 'Third Level Item', to: '/t2',
                            component: ThirdLevelItem,
                        },
                        {
                            label: 'Third Level Item', to: '/t3',
                            component: ThirdLevelItem,
                        },
                        {
                            label: 'Third Level Item', to: '/t4',
                            component: ThirdLevelItem,
                        }
                    ]
                }

            ]
        },

        {
            icon: 'files-o',
            label: 'Sample Pages',
            to: "/sample",
            component: SamplePages,
            content: [
                {
                    icon: 'files-o',
                    to: '/blank.html',
                    component: SecondPage,
                    label: 'Blank Page'
                },
                {
                    to: '/login.html',
                    component: MyBlank,
                    label: 'Login Page'
                }

            ]
        }
    ]
}
bootstrap(moduleConfig)


//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function () {
    $(window).bind("load resize", function () {
        var topOffset = 50;
        var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

});
