import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchPlacesThunk} from '../store/places'
import {fetchMoviesThunk} from '../store/movies'
import {Grid, Button, Container} from '@material-ui/core'
import PlacesCard from './places-card'
import MoviesCard from './movies-card'

class DisconnectedSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: 'Chicago',
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
      this.props.fetchPlacesThunk(this.state.term, this.state.location)
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <Container>
        {' '}
        <h3>Places</h3>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <label htmlFor="location">Location</label>
            <input
              name="location"
              value={this.state.location}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item>
            <label htmlFor="term">Search Term</label>
            <input
              name="term"
              value={this.state.term}
              onChange={this.handleChange}
            />
          </Grid>
          <br />
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={this.handleSubmit}
            >
              Get Places
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={this.props.fetchMoviesThunk}
            >
              Get Movies Now Showing
            </Button>
          </Grid>
          {this.props.places && this.props.places.length ? (
            <PlacesCard places={this.props.places} />
          ) : (
            ''
          )}
          {this.props.movies && this.props.movies.length ? (
            <MoviesCard movies={this.props.movies} />
          ) : (
            ''
          )}
        </Grid>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    places: state.places,
    movies: state.movies
  }
}

const mapDispatch = dispatch => {
  return {
    fetchPlacesThunk: (term, location) =>
      dispatch(fetchPlacesThunk(term, location)),
    fetchMoviesThunk: () => dispatch(fetchMoviesThunk())
  }
}

export default withRouter(connect(mapState, mapDispatch)(DisconnectedSearch))
