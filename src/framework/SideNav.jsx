import React from 'react'
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
    render() { return (<div className="sidebar col-sm-3 col-md-2 hidden-xs-down bg-faded" >asdf
        </div>) }
}
