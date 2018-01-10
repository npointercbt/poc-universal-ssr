import React from 'react'
import universal from 'react-universal-component'
import { NOT_FOUND } from 'redux-first-router';

const options = {
  loadingTransition: false,
  onLoad(module, info, props, context) {
    // allows for reducers to be loaded as needed
    if (module.reducers) {
      context.store.injectReducers(module.reducers)
    }
  }
}

const loadPage = ({ page }) => page === NOT_FOUND ? import(`./404`) : import(`./${page}`);

const UniversalPage = universal(loadPage, options)

export default UniversalPage