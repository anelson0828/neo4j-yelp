import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {createDateThunk, fetchDatesThunk} from '../store/dates'
import {UsersDropdown, AddUser, DateCard} from '.'

class DisconnectedUsers extends React.Component {
  componentDidMount() {
    this.props.getDates()
  }

  render() {
    return (
      <div>
        <h3>Add Users</h3>
        <AddUser />
        <h3>Select Active User</h3>
        <UsersDropdown />
        <h3>User's Favorited Dates</h3>
        {this.props.favoriteDates.length ? (
          <DateCard dates={this.props.favoriteDates} />
        ) : (
          'No favorite dates'
        )}
        <h3>User's Recommended Dates</h3>
        {this.props.recommendedDates.length ? (
          <DateCard dates={this.props.recommendedDates} />
        ) : (
          'No recommended dates. Please add dates to your favorites.'
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    recommendedDates: state.selectedUser.recommendedDates,
    favoriteDates: state.selectedUser.favoriteDates
  }
}

const mapDispatch = dispatch => {
  return {
    createDateThunk: name => dispatch(createDateThunk(name)),
    getDates: () => dispatch(fetchDatesThunk())
  }
}

export default withRouter(connect(mapState, mapDispatch)(DisconnectedUsers))
