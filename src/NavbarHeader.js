import React from 'react'

import {
    Link
} from 'react-router-dom'

const NavbarHeader = props => (
    <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
        </button>
        <Link className="navbar-brand" to="/">SB Admin v2.0</Link>
    </div>
)

export default NavbarHeader
