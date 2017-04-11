import React from 'react'
import Icon from './Icon'
export default class SideNav extends React.Component {
    static propTypes = {
        /**
         * Menu content
         */
        content: React.PropTypes.array.isRequired,
        /**
         * Side nav is visible
         */
        visible: React.PropTypes.bool.isRequired
    }
    render() {
        return (<nav className="sidebar col-sm-3 col-md-2 hidden-xs-down bg-faded" role="navigaton">
            <ul className="nav">
                <li className=""><a href="#" ><Icon name="dashboard" fw /> Dashboard</a></li>
                <li className=""><a href="#" ><Icon name="eye" fw /> Eye</a></li>
                <li className=""><a href="#" ><Icon name="dashboard" fw /> First Level</a>
                    <ul className="nav ">
                        <li className=""><a href="#">Second Level</a></li>
                        <li className=""><a href="#">Second Level</a></li>
                    </ul>
                </li>
                <li className=""><a href="#">asdf</a></li>
                <li className=""><a href="#">asdf</a></li>
                <li className=""><a href="#">asdf</a>
                    <ul className="nav ">
                        <li className=""><a href="#">asdf</a></li>
                        <li className=""><a href="#">Second Level</a>
                            <ul className="nav">
                                <li className=""><a href="#">Third Level</a></li>
                                <li className=""><a href="#">Third Level</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className="nav-item"><a href="#">asdf</a>
                    <ul className="nav nav-pills">
                        <li className="nav-item"><a href="#">asdf</a></li>
                        <li className="nav-item"><a href="#">asdf</a></li>
                    </ul>
                </li>
                <li className="nav-item"><a href="#">asdf</a></li>
            </ul>
        </nav>)
    }
}
