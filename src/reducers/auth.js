import { SET_USER } from "../actions/auth"

const auth = (state = { username: "" }, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        username: action.user.username,
      }
    default:
      return state
  }
}

export default auth
