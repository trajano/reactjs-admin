# ReactJS Admin Template

[![Build Status](https://travis-ci.org/trajano/reactjs-admin.svg?branch=master)](https://travis-ci.org/trajano/reactjs-admin)

This is an admin template application framework for ReactJS.  The focus is for creating an application rather than letting developers with individual components.

This does not provide any backend connectivity and is primarily using ReactJS as a view layer.

# Installation

`npm install`

This will run `webpack -p` to build the resulting site in the `dist` folder.

# Development mode

`npm start`

This will start up a server on http://localhost:8080/ that will show the portfolio site.  It is configured to automatically refresh the page when there is a change in the application.

# Completed

* Collapsible notification bar.
* Configurable side navigation.

# TODO

* Enable custom components in the notification bar dropdowns.
* i18n-next integration
* Modal record editting.  The use of modal for form editting allows catching problems when saving the record primarily optimistic locking where someone else modifies the record that the user is modifying.
* Modal confirmations.