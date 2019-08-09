import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import users from './users'
import selectedUser from './selectedUser'
import places from './places'
import selectedDate from './selectedDate'
import dates from './dates'
import movies from './movies'

const reducer = combineReducers({
  users,
  selectedUser,
  places,
  movies,
  selectedDate,
  dates
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
