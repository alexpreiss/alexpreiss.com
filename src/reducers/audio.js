import { SET_PLAYING, SET_AUDIO_SRC } from "../actions/audio"

const audio = (state = { playing: false, src: "" }, action) => {
  switch (action.type) {
    case SET_PLAYING:
      return {
        ...state,
        playing: action.playing,
      }

    case SET_AUDIO_SRC:
      return {
        ...state,
        src: action.src,
      }

    default:
      return state
  }
}

export default audio
