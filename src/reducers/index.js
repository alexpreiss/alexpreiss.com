import { combineReducers } from "redux"
import auth from "./auth"
import audio from "./audio"

export default combineReducers({
  auth,
  audio,
})
