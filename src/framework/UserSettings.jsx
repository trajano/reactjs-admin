import React from 'react'
import PropTypes from 'prop-types'

import Loader from './Loader'
let modalBody = <form>Show application in this language
    <div className="custom-controls-stacked" >
        <label className="custom-control custom-radio">
            <input id="radio1" name="radio" type="radio" className="custom-control-input" />
            <span className="custom-control-indicator"></span>
            <span className="custom-control-description">Toggle this custom radio</span>
        </label>
        <label className="custom-control custom-radio">
            <input id="radio2" name="radio" type="radio" className="custom-control-input" />
            <span className="custom-control-indicator"></span>
            <span className="custom-control-description">Or toggle this other custom radio</span>
        </label>
    </div>
</form>

export default class UserSettings extends React.Component {
    static propTypes = {
        showModal: PropTypes.func.isRequired
    }
    static contextTypes = {
        store: PropTypes.object
    }
    constructor(props) {
        super(props)
        this.handleStoreChange = this.handleStoreChange.bind(this)
        this.pageLoad = this.pageLoad.bind(this)
        this.state = {
            page: {
                loaded: false
            }
        }
    }
    handleStoreChange() {
        const pageFromRedux = this.context.store.getState().page
        if (JSON.stringify(this.state.pageFromRedux) !== JSON.stringify(pageFromRedux)) {
            this.setState({ page: pageFromRedux })
        }
    }
    pageLoad(resolve, reject) {
        setTimeout(() => {
            resolve({
                username: "trajano",
                firstName: "Archimedes",
                language: this.context.store.getState().user.language
            })
        }, 500)
    }
    componentDidMount() {
        this.context.store.dispatch({
            type: 'PAGE_CLEAR'
        })
        this.unsubscribeStore = this.context.store.subscribe(this.handleStoreChange)
        this.pageLoadPromise = new Promise(this.pageLoad)
        this.pageLoadPromise.then((data) => {
            this.context.store.dispatch({
                type: 'PAGE_LOAD',
                data
            })
        })
        this.context.store.dispatch({
            type: 'PAGE_CLEAR'
        })
    }
    componentWillUnmount() {
        this.unsubscribeStore()
    }
    render() {
        if (!this.state.page.loaded) {
            return <Loader />
        }
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Your profile</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <button className="btn btn-secondary" onClick={this.props.showModal("Change language", modalBody)}>Change language</button>
                    </div>
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                Basic Form Elements
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <form role="form">
                                            <div className="form-group">
                                                <label>Text Input</label>
                                                <input className="form-control" defaultValue={this.context.store.getState().user.language} />
                                                <p className="help-block">Example block-level help text here.</p>
                                            </div>
                                            <div className="form-group">
                                                <label>Text Input with Placeholder</label>
                                                <input className="form-control" placeholder="Enter text" />
                                            </div>
                                            <div className="form-group">
                                                <label>Static Control</label>
                                                <p className="form-control-static">email@example.com</p>
                                            </div>
                                            <div className="form-group">
                                                <label>File input</label>
                                                <input type="file" />
                                            </div>
                                            <div className="form-group">
                                                <label>Text area</label>
                                                <textarea className="form-control" rows="3"></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label>Checkboxes</label>
                                                <div className="checkbox">
                                                    <label>
                                                        <input type="checkbox" value="" />Checkbox 1
                                                </label>
                                                </div>
                                                <div className="checkbox">
                                                    <label>
                                                        <input type="checkbox" value="" />Checkbox 2
                                                </label>
                                                </div>
                                                <div className="checkbox">
                                                    <label>
                                                        <input type="checkbox" value="" />Checkbox 3
                                                </label>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Inline Checkboxes</label>
                                                <label className="checkbox-inline">
                                                    <input type="checkbox" />1
                                            </label>
                                                <label className="checkbox-inline">
                                                    <input type="checkbox" />2
                                            </label>
                                                <label className="checkbox-inline">
                                                    <input type="checkbox" />3
                                            </label>
                                            </div>
                                            <div className="form-group">
                                                <label>Radio Buttons</label>
                                                <div className="radio">
                                                    <label>
                                                        <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" defaultChecked />Radio 1
                                                </label>
                                                </div>
                                                <div className="radio">
                                                    <label>
                                                        <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2" />Radio 2
                                                </label>
                                                </div>
                                                <div className="radio">
                                                    <label>
                                                        <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3" />Radio 3
                                                </label>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Inline Radio Buttons</label>
                                                <label className="radio-inline">
                                                    <input type="radio" name="optionsRadiosInline" id="optionsRadiosInline1" value="option1" defaultChecked />1
                                            </label>
                                                <label className="radio-inline">
                                                    <input type="radio" name="optionsRadiosInline" id="optionsRadiosInline2" value="option2" />2
                                            </label>
                                                <label className="radio-inline">
                                                    <input type="radio" name="optionsRadiosInline" id="optionsRadiosInline3" value="option3" />3
                                            </label>
                                            </div>
                                            <div className="form-group">
                                                <label>Selects</label>
                                                <select className="form-control">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Multiple Selects</label>
                                                <select multiple className="form-control">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </div>
                                            <button type="submit" className="btn btn-default">Submit Button</button>
                                            <button type="reset" className="btn btn-default">Reset Button</button>
                                        </form>
                                    </div>
                                    <div className="col-lg-6">
                                        <h1>Disabled Form States</h1>
                                        <form role="form">
                                            <fieldset disabled>
                                                <div className="form-group">
                                                    <label htmlFor="disabledSelect">Disabled input</label>
                                                    <input className="form-control" id="disabledInput" type="text" placeholder="Disabled input" disabled />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="disabledSelect">Disabled select menu</label>
                                                    <select id="disabledSelect" className="form-control">
                                                        <option>Disabled select</option>
                                                    </select>
                                                </div>
                                                <div className="checkbox">
                                                    <label>
                                                        <input type="checkbox" />Disabled Checkbox
                                                </label>
                                                </div>
                                                <button type="submit" className="btn btn-primary">Disabled Button</button>
                                            </fieldset>
                                        </form>
                                        <h1>Form Validation States</h1>
                                        <form role="form">
                                            <div className="form-group has-success">
                                                <label className="control-label" htmlFor="inputSuccess">Input with success</label>
                                                <input type="text" className="form-control" id="inputSuccess" />
                                            </div>
                                            <div className="form-group has-warning">
                                                <label className="control-label" htmlFor="inputWarning">Input with warning</label>
                                                <input type="text" className="form-control" id="inputWarning" />
                                            </div>
                                            <div className="form-group has-error">
                                                <label className="control-label" htmlFor="inputError">Input with error</label>
                                                <input type="text" className="form-control" id="inputError" />
                                            </div>
                                        </form>
                                        <h1>Input Groups</h1>
                                        <form role="form">
                                            <div className="form-group input-group">
                                                <span className="input-group-addon">@</span>
                                                <input type="text" className="form-control" placeholder="Username" />
                                            </div>
                                            <div className="form-group input-group">
                                                <input type="text" className="form-control" />
                                                <span className="input-group-addon">.00</span>
                                            </div>
                                            <div className="form-group input-group">
                                                <span className="input-group-addon"><i className="fa fa-eur"></i>
                                                </span>
                                                <input type="text" className="form-control" placeholder="Font Awesome Icon" />
                                            </div>
                                            <div className="form-group input-group">
                                                <span className="input-group-addon">$</span>
                                                <input type="text" className="form-control" />
                                                <span className="input-group-addon">.00</span>
                                            </div>
                                            <div className="form-group input-group">
                                                <input type="text" className="form-control" />
                                                <span className="input-group-btn">
                                                    <button className="btn btn-default" type="button"><i className="fa fa-search"></i>
                                                    </button>
                                                </span>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}