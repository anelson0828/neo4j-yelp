import axios from 'axios'

export const SET_USER = 'SET_USER'
export const ADD_USER = 'ADD_USER'
export const SET_FAVORITE_DATES = 'SET_FAVORITE_DATES'
export const ADD_FAVORITE_DATE = 'ADD_FAVORITE_DATE'
export const SET_RECOMMENDED_DATES = 'SET_RECOMMENDED_DATES'

export const setUser = user => {
  return {type: SET_USER, user}
}

export const addUser = user => {
  return {type: ADD_USER, user}
}

export const setFavoriteDates = dates => {
  return {type: SET_FAVORITE_DATES, dates}
}

export const favoriteDate = date => {
  return {type: ADD_FAVORITE_DATE, date}
}

export const setRecommendedDates = dates => {
  return {type: SET_RECOMMENDED_DATES, dates}
}

export const fetchUserThunk = user => {
  return dispatch => {
    dispatch(setUser(user))
  }
}

export const addUserThunk = user => {
  return async dispatch => {
    const response = await axios.post('/api/users', user)
    const newUser = response.data
    dispatch(addUser(newUser))
  }
}

export const fetchFavoriteDatesThunk = username => {
  return async dispatch => {
    const response = await axios.get(`/api/users/${username}/favorite`)
    const dates = response.data
    console.log('fetch dates', dates)
    dispatch(setFavoriteDates(dates))
  }
}

export const favoriteDateThunk = (date, username) => {
  return async dispatch => {
    const response = await axios.put(`/api/users/${username}/favorite`, date)
    const favoritedDate = response.data
    dispatch(favoriteDate(favoritedDate))
  }
}

export const fetchRecommendedDatesThunk = username => {
  return async dispatch => {
    const response = await axios.get(`/api/users/${username}/recommended`)
    const dates = response.data
    dispatch(setRecommendedDates(dates))
  }
}

export default (
  selectedUser = {name: '', favoriteDates: [], recommendedDates: []},
  action
) => {
  switch (action.type) {
    case SET_USER:
      return {...selectedUser, name: action.user}
    case ADD_USER:
      return {...selectedUser, name: action.user}
    case SET_FAVORITE_DATES:
      return {...selectedUser, favoriteDates: action.dates}
    case ADD_FAVORITE_DATE:
      return {
        ...selectedUser,
        favoriteDates: [...selectedUser.favoriteDates, action.date]
      }
    case SET_RECOMMENDED_DATES:
      return {
        ...selectedUser,
        recommendedDates: action.dates
      }
    default:
      return selectedUser
  }
}
