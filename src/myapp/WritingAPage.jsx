import React from 'react'
export default (props) => {
    const code = `
import React from 'react'
export default (props) => {
    // extract the translation code
    const {t} = props
    return <div>{t('translated text')}</div>

    return <Page title="page.title">
        then show non-editable.
        To allow edit show a button that would bring up the modal editor
        <EditForm someid maybe?>
    </Page>
}
`
    return <div className="container-fluid">
        <div className="row">
            <div className="col-lg-12">
                <h1 className="page-header">Writing a Page</h1>
                <pre>{code}</pre>
            </div>
        </div>
    </div>
}