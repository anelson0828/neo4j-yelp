import axios from 'axios'

export const SET_PLACES = 'SET_PLACES'
export const CREATE_PLACE = 'CREATE_PLACE'
export const DELETE_STUDENT = 'DELETE_STUDENT'

export const setPlaces = places => {
  return {type: SET_PLACES, places}
}

export const createPlace = place => {
  return {type: CREATE_PLACE, place}
}

export const deleteStudent = studentId => {
  return {type: DELETE_STUDENT, studentId}
}

export const fetchPlacesThunk = (term, location) => {
  return async dispatch => {
    const response = await axios.get(
      `/api/yelp/search?term=${term}&location=${location}`
    )
    const places = response.data
    dispatch(setPlaces(places))
  }
}

export const createPlaceThunk = place => {
  return async dispatch => {
    const response = await axios.post('/api/places', place)
    const newPlace = response.data
    dispatch(createPlace(newPlace))
  }
}

export const deleteStudentThunk = studentId => {
  return async dispatch => {
    await axios.delete(`/api/students/${studentId}`)
    dispatch(deleteStudent(studentId))
  }
}

export default (places = [], action) => {
  switch (action.type) {
    case SET_PLACES:
      return action.places
    case CREATE_PLACE:
      return [...places, action.place]
    case DELETE_STUDENT:
      return places.filter(student => student.id !== action.studentId)
    default:
      return places
  }
}
