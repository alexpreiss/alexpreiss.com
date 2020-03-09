export const SET_USER = "SET_USER"
export const SET_AUTH_STATE = "SET_AUTH_STATE"

export function setUser(user) {
  return { type: SET_USER, user }
}

export function setAuthState(authState) {
  return { type: SET_AUTH_STATE, authState }
}
