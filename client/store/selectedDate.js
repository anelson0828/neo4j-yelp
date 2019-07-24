import axios from 'axios'

export const SET_DATE = 'SET_DATE'
export const ADD_PLACE = 'ADD_PLACE'

export const setDate = date => {
  return {type: SET_DATE, date}
}

export const addPlace = place => {
  return {type: ADD_PLACE, place}
}

export const fetchDateThunk = dateId => {
  return async dispatch => {
    const response = await axios.get(`/api/dates/${dateId}`)
    const date = response.data
    dispatch(setDate(date))
  }
}

export const addPlaceThunk = place => {
  return async dispatch => {
    const response = await axios.post('/api/places', place)
    const newPlace = response.data
    dispatch(addPlace(newPlace))
  }
}

export default (selectedDate = {name: '', places: []}, action) => {
  switch (action.type) {
    case SET_DATE:
      return action.date
    case ADD_PLACE:
      return {...selectedDate, places: [...selectedDate.places, action.place]}
    default:
      return selectedDate
  }
}
