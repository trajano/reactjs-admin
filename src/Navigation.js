import React from 'react'
import NavbarHeader from './NavbarHeader'

import {
    Link
} from 'react-router-dom'

const Navigation = props => (
    <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{ marginBottom: 0 }}>
        <NavbarHeader />
    </nav>
)

export default Navigation