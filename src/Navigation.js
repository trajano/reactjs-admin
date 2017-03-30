import React from 'react'
import NavbarHeader from './NavbarHeader'
import NavbarStaticSide from './NavbarStaticSide'

import {
    Link, Route
} from 'react-router-dom'

const Navigation = props => (
    <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{ marginBottom: 0 }}>
        <NavbarHeader />
        <NavbarStaticSide />
    </nav>
)

export default Navigation