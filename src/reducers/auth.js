import { SET_USERNAME } from "../actions/auth"

const auth = (state = { username: "" }, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        username: action.username,
      }
    default:
      return state
  }
}

export default auth
