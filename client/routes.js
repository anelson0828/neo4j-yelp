import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Search, Dates, SingleDate, Users} from './components'

/**
 * COMPONENT
 */
export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/search" component={Search} />
        <Route exact path="/dates" component={Dates} />
        <Route exact path="/users" component={Users} />
        <Route path="/dates/:dateName" component={SingleDate} />
      </Switch>
    )
  }
}
