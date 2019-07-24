import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {createDateThunk} from '../store/dates'
import Button from '@material-ui/core/Button'
import PlacesCard from './places-card'

class DisconnectedDates extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: ''
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
      this.props.createDateThunk({name: this.state.name})
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <div>
        <h3>Dates</h3>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <label htmlFor="description">Description</label>
        <input
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={this.handleSubmit}
        >
          Create Date
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
    createDateThunk: name => dispatch(createDateThunk(name))
  }
}

export default withRouter(connect(mapState, mapDispatch)(DisconnectedDates))
