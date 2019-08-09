import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {fetchUsersThunk} from '../store/users'
import {
  fetchUserThunk,
  fetchFavoriteDatesThunk,
  fetchRecommendedDatesThunk
} from '../store/selectedUser'

class DisconnectedUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      open: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  async handleChange(event) {
    await this.setState({
      name: event.target.value
    })
  }

  async handleClose() {
    try {
      this.setState({open: false})
      await this.setState({
        name: event.target.value
      })
      this.props.setUser(this.state.name)
      this.props.getFavoriteDates(this.state.name)
      this.props.getRecommendedDates(this.state.name)
    } catch (err) {
      console.error(err)
    }
  }

  handleOpen() {
    this.setState({open: true})
  }

  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    if (!this.props.users.length) {
      return <div>Loading</div>
    }
    return (
      <form autoComplete="off">
        <FormControl>
          <InputLabel htmlFor="demo-controlled-open-select">User</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.name}
            onChange={this.handleChange}
            inputProps={{
              name: 'name',
              id: 'demo-controlled-open-select'
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.props.users.map(user => {
              return (
                <MenuItem value={user} key={user}>
                  {user}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </form>
    )
  }
}

const mapState = state => {
  return {
    selectedUser: state.selectedUser,
    users: state.users
  }
}

const mapDispatch = dispatch => {
  return {
    getUsers: () => {
      dispatch(fetchUsersThunk())
    },
    setUser: name => {
      dispatch(fetchUserThunk(name))
    },
    getFavoriteDates: name => {
      dispatch(fetchFavoriteDatesThunk(name))
    },
    getRecommendedDates: name => {
      dispatch(fetchRecommendedDatesThunk(name))
    }
  }
}

export default connect(mapState, mapDispatch)(DisconnectedUsers)
