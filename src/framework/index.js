/**
 * In terms of design, this is the entry point for the framework and should not try to access anything else above this tree.
 */
import React from 'react'
import ReactDOM from 'react-dom'

import './style.scss'
import Module from './Module'

/**
 * Bootstrap the application
 * @param {ModuleConfig} config configuration for the module
 * @param {Object|function} modules 
 */
function bootstrap(config, modules) {
    ReactDOM.render(<Module config={config} />,
        document.getElementById("app"))
}
export default bootstrap
