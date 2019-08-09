import React from 'react'
import {Button, Input} from '@material-ui/core'
import {connect} from 'react-redux'
import {createUserThunk} from '../store/users'

class DisconnectedAddUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
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
      this.props.createUser({name: this.state.name})
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <div>
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
          Create User
        </Button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    selectedUser: state.selectedUser
  }
}

const mapDispatch = dispatch => {
  return {
    createUser: user => {
      dispatch(createUserThunk(user))
    }
  }
}

export default connect(mapState, mapDispatch)(DisconnectedAddUser)
