import { createStore, applyMiddleware, compose } from 'redux'
import createReducer from './reducers/index'
import createBrowserHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'
import { connectRoutes } from 'redux-first-router'
import routes from './routes'

const configureStore = (initialState, path = '/') => {
  const createHistory = typeof window !== 'undefined' ? 
    createBrowserHistory :
    createMemoryHistory ;

  const history = createHistory({ initialEntries: [path], basename:'/dev' })
  const { reducer:location, middleware:locationMiddleware, enhancer:locationEnhancer } = connectRoutes(history, routes)

  const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancers = composeEnhancers(locationEnhancer, applyMiddleware(locationMiddleware))

  const store = createStore(
    createReducer({ location }), 
    initialState,
    enhancers
  )

  store.injectReducers = (asyncReducers) => 
    store.replaceReducer(
      createReducer({ location, ...asyncReducers })
    )

  if (module.hot) {
    module.hot.accept(
      './reducers',
      () => store.replaceReducer(require('./reducers').default)
    )
  }

  return store;
}

export default configureStore
