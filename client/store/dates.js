import axios from 'axios'

export const SET_DATES = 'SET_DATES'
export const CREATE_DATE = 'CREATE_DATE'

export const setDates = dates => {
  return {type: SET_DATES, dates}
}

export const createDate = date => {
  return {type: CREATE_DATE, date}
}

export const fetchDatesThunk = () => {
  return async dispatch => {
    const response = await axios.get(`/api/dates`)
    const dates = response.data
    dispatch(setDates(dates))
  }
}

export const createDateThunk = date => {
  return async dispatch => {
    const response = await axios.post('/api/dates', date)
    const newDate = response.data
    dispatch(createDate(newDate))
  }
}

export default (dates = [], action) => {
  switch (action.type) {
    case SET_DATES:
      return action.dates
    case CREATE_DATE:
      return [...dates, action.date]
    default:
      return dates
  }
}
