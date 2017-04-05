import React from 'react'
import Navbar from 'react-bootstrap/lib/Navbar'

import classNames from 'classnames'
import {
    bsClass as setBsClass,
    bsStyles,
    getClassSet,
    prefix,
    splitBsPropsAndOmit,
} from 'react-bootstrap/lib/utils/bootstrapUtils';
class FullWidthNavbar extends Navbar {
    render() {
        const {
      componentClass: Component,
            fixedTop,
            fixedBottom,
            fluid,
            staticTop,
            inverse,
            className,
            children,
            ...props
    } = this.props;

        const [bsProps, elementProps] = splitBsPropsAndOmit(props, [
            'expanded', 'onToggle', 'onSelect', 'collapseOnSelect',
        ]);

        // will result in some false positives but that seems better
        // than false negatives. strict `undefined` check allows explicit
        // "nulling" of the role if the user really doesn't want one
        if (elementProps.role === undefined && Component !== 'nav') {
            elementProps.role = 'navigation';
        }

        if (inverse) {
            bsProps.bsStyle = Style.INVERSE;
        }

        const classes = {
            ...getClassSet(bsProps),
            [prefix(bsProps, 'fixed-top')]: fixedTop,
            [prefix(bsProps, 'fixed-bottom')]: fixedBottom,
            [prefix(bsProps, 'static-top')]: staticTop,
        };

        return (
            <Component
            
                {...elementProps}
                className={classNames(className, classes)}
            >
                    {children}
            </Component>
        )
    }
}
setBsClass('navbar', FullWidthNavbar)
export default FullWidthNavbar