import { SET_USER, SET_AUTH_STATE } from "../actions/auth"

const auth = (
  state = { username: "", id: null, authState: "loading" },
  action
) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        username: action.user.username,
        id: action.user.id,
      }

    case SET_AUTH_STATE:
      let authState
      if (action.authState === "loading") {
        authState = "loading"
      } else if (action.authState === "guest") {
        authState = "guest"
      } else if (action.authState === "authenticated") {
        authState = "authenticated"
      } else {
        authState = "guest"
      }

      return {
        ...state,
        authState: authState,
      }

    default:
      return state
  }
}

export default auth
