import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchPlacesThunk} from '../store/places'
import Button from '@material-ui/core/Button'
import PlacesCard from './places-card'

class DisconnectedSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: 'chicago',
      term: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit() {
    try {
      event.preventDefault()
      console.log('state', this.state)
      this.props.fetchPlacesThunk(this.state.term, this.state.location)
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <div>
        <h3>Places</h3>
        <label htmlFor="location">Location</label>
        <input
          name="location"
          value={this.state.location}
          onChange={this.handleChange}
        />
        <label htmlFor="term">Search Term</label>
        <input
          name="term"
          value={this.state.term}
          onChange={this.handleChange}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={this.handleSubmit}
        >
          Get Places
        </Button>
        <PlacesCard places={this.props.places} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    places: state.places
  }
}

const mapDispatch = dispatch => {
  return {
    fetchPlacesThunk: (term, location) =>
      dispatch(fetchPlacesThunk(term, location))
  }
}

export default withRouter(connect(mapState, mapDispatch)(DisconnectedSearch))
