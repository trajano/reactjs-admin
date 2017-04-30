/**
 * In terms of design, this is the entry point for the framework and should not try to access anything else above this tree.
 */
import React from 'react'
import ReactDOM from 'react-dom'

import './style.scss'
import frameworkRedux from './reducers'
import Module from './Module'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import i18n from './i18n'
import { I18nextProvider } from 'react-i18next';

/**
 * Bootstrap the application
 * @param {ModuleConfig} config configuration for the module
 * @param {Object|function} modules
 */
function bootstrap(config, loadUserProfileCallback, modules) {
    const store = createStore(frameworkRedux)
    ReactDOM.render(<I18nextProvider i18n={i18n}>
        <Provider store={store}>
            <Module config={config} />
        </Provider>
    </I18nextProvider>,
        document.getElementById("app"))
}
export default bootstrap
