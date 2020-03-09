export const SET_PLAYING = "SET_PLAYING"
export const SET_AUDIO_SRC = "SET_AUDIO_SRC"

export function setPlaying(playing) {
  return { type: SET_PLAYING, playing }
}

export function setAudioSrc(src) {
  return { type: SET_AUDIO_SRC, src }
}
