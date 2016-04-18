import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'
import cars from './cars'
const rootReducer = combineReducers({
  cars,
  router: routerStateReducer
})

export default rootReducer
