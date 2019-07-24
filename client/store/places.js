import axios from 'axios'

export const SET_PLACES = 'SET_PLACES'
export const CREATE_PLACE = 'CREATE_PLACE'

export const setPlaces = places => {
  return {type: SET_PLACES, places}
}

export const createPlace = place => {
  return {type: CREATE_PLACE, place}
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

export default (places = [], action) => {
  switch (action.type) {
    case SET_PLACES:
      return action.places
    case CREATE_PLACE:
      return [...places, action.place]
    default:
      return places
  }
}
