import React from 'react'
import SideMenu from './SideMenu'
import './SideMenu.scss'

class SidebarNav extends React.Component {
    render() {
        const width = window.innerWidth
        let className = "sidebar-nav navbar-collapse"
        if (width < 768) {
            className += " collapse"
        }
        return <div className={className}>
            <ul className="nav">
                <li className="sidebar-search">
                    <div className="input-group custom-search-form">
                        <input type="text" className="form-control" placeholder="Search..." />
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button">
                                <i className="fa fa-search"></i>
                            </button>
                        </span>
                    </div>
                </li>
            </ul>
            <SideMenu content={this.props.content} isPathActive={this.props.isPathActive} />
        </div>
    }
}

export default SidebarNav