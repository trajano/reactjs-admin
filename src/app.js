import React from 'react'
import ReactDOM from 'react-dom'
import './app.scss'
import Navigation from './Navigation.js'

const AppComponent = props => (
    <div id="wrapper">
        <Navigation />
        <div id="page-wrapper">
            hello world
        </div>
    </div>
)

ReactDOM.render(<AppComponent />, document.getElementById("app"))
