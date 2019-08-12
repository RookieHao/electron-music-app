/** @format */
export function fomatterTime(time: number) {
  let dateTime = (time / 1000) | 0
  let h = (dateTime / 3600) | 0
  let m = ((dateTime % 3600) / 60) | 0
  let s = dateTime % 60 | 0
  return padStartWithZero([h, m, s])
}

function padStartWithZero(sss: Array<number | string>, n: number = 2) {
  let [h, m, s] = sss
  if (m === 0) m = '0'
  if (s === 0) s = '0'
  return [h, m, s]
    .filter(Boolean)
    .map(item => item.toString().padStart(n, '0'))
    .join(':')
}

export default {
  fomatterTime,
}
