import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {createDateThunk, fetchDatesThunk} from '../store/dates'
import {Button, Input} from '@material-ui/core'
import DateList from './date-list'

class DisconnectedDates extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.getDates()
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
        <Input
          name="name"
          value={this.state.name}
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
        <DateList dates={this.props.dates} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    places: state.places,
    dates: state.dates
  }
}

const mapDispatch = dispatch => {
  return {
    createDateThunk: name => dispatch(createDateThunk(name)),
    getDates: () => dispatch(fetchDatesThunk())
  }
}

export default withRouter(connect(mapState, mapDispatch)(DisconnectedDates))
