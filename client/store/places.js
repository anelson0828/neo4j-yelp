import axios from 'axios'

export const SET_PLACES = 'SET_PLACES'

export const setPlaces = places => {
  return {type: SET_PLACES, places}
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

export default (places = [], action) => {
  switch (action.type) {
    case SET_PLACES:
      return action.places
    default:
      return places
  }
}
