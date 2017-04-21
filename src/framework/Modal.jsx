import React from 'react'
import PropTypes from 'prop-types'
import './modal.scss'

export default class Modal extends React.Component {
    static propTypes = {
        dismissModal: PropTypes.func.isRequired,
        bodyComponent: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired
    }
    render() {
        return (<div key="modal" className="modal" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
            <div className="modal-dialog modal-xl modal-lg modal-md" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalTitle">{this.props.title}</h5>
                        <button type="button" className="close" onClick={this.props.dismissModal} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">{this.props.bodyComponent}</div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={this.props.dismissModal}>Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>)
    }
}
