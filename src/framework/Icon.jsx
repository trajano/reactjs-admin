import React from 'react'
import 'font-awesome-webpack'

const Icon = props => {
    let classes = ['fa', 'fa-' + props.name]
    if (props.fw) {
        classes.push('fa-fw')
    }
    return <i className={classes.join(' ')} aria-hidden="true"></i>
}

Icon.PropTypes = {
    name: React.PropTypes.string.isRequired,
    fw: React.PropTypes.bool
}

export default Icon