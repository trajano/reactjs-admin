import React from 'react'
import ReactDOM from 'react-dom'
import './app.scss'

const AppComponent = props => (
    <div id="wrapper">
        <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{marginBottom: 0}}>
        </nav>
        <div id="page-wrapper">
            hello world
        </div>
    </div>
)

ReactDOM.render(<AppComponent />, document.getElementById("app"))
