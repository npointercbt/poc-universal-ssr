import React from 'react'
import { connect } from 'react-redux'
import UniversalPage from './UniversalPage'
import Link, { PreLink } from './Link'
import './App.css'


class App extends React.Component {
  render() {
    const { page } = this.props;  

    return (
      <div>
        <UniversalPage page={ page } />
        <br />

        <PreLink to="/">Home</PreLink>
        <PreLink to="/foo">Foo</PreLink>
        <PreLink to="/bar">Bar</PreLink>
        <PreLink to="/asdfasdf">404</PreLink>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  page: state.location.type
})


export default connect(mapStateToProps)(App)
