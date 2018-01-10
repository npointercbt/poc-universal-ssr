import React from 'react'
import { invert, get } from 'lodash';
import UniversalPage from './UniversalPage';
import Link from 'redux-first-router-link'
import { NOT_FOUND } from 'redux-first-router';

import routes from '../routes'

const invertRoutes = invert(routes)

const preloadRoute = to => {
    const page = get(invertRoutes, to);
    if(typeof page === 'undefined'){
        return UniversalPage.preload({ page: NOT_FOUND });   
    } 
    return UniversalPage.preload({ page });
}

export const PreLink = (props) => 
    <Link onMouseOver={ ()=>preloadRoute(props.to) }  {...props} />

export default Link