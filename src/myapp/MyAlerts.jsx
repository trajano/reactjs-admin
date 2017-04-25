import React from 'react'
export default (props) => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-lg-12">
                <h1 className="page-header">My Alerts</h1>
                <p>My dashboard</p>
                <div className="dropdown show">
                    <a className="btn btn-secondary dropdown-toggle" href="https://example.com" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown link</a>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
)