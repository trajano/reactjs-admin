import React from 'react'
import ReactDOM from 'react-dom'
import './app.scss'
// import Navigation from './Navigation.js'
import 'font-awesome-webpack'
//import hierarchy from "./hierarchy"

import {
    Link, Route, BrowserRouter as Router
} from 'react-router-dom'

const AppComponent = props => {
    
    console.log (hierarchy)
    return (<Router>
        <div id="wrapper">
            <Navigation hierarchy={hierarchy} />
            <Route exact path="/" component={Home} />
            <Route path="/blank" component={Blank} />
            <Route path="/buttons" component={Buttons} />
            <Route path="/flot" component={Flot} />
        </div>
    </Router>)
}

const Home = () => (
    <div id="page-wrapper">
        hello world home
     </div>
)

const Blank = () => (
    <div id="page-wrapper">
        hello world blank
     </div>
)

const Buttons = () => (
    <div id="page-wrapper">
        hello world buttons
     </div>
)

const Flot = () => (
    <div id="page-wrapper">
        hello world Flot
     </div>
)

export default function BootstrapApplication(config) {
    ReactDOM.render(<AppComponent />, document.getElementById("app"))
}
