import axios from 'axios'

export const SET_USERS = 'SET_USERS'
export const CREATE_USER = 'CREATE_USER'

export const setUsers = users => {
  return {type: SET_USERS, users}
}

export const createUser = user => {
  return {type: CREATE_USER, user}
}

export const fetchUsersThunk = () => {
  return async dispatch => {
    const response = await axios.get(`/api/users`)
    const users = response.data
    dispatch(setUsers(users))
  }
}

export const createUserThunk = user => {
  return async dispatch => {
    const response = await axios.post('/api/users', user)
    const newUser = response.data
    dispatch(createUser(newUser))
  }
}

export default (users = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users
    case CREATE_USER:
      return [...users, action.user]
    default:
      return users
  }
}
