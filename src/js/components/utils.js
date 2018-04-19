function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getParameterByName (name, url) {
  if (!url) url = window.location.href
  /* eslint-disable no-useless-escape */
  name = name.replace(/[\[\]]/g, '\\$&')
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`)
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export {
  getRandomInt,
  getParameterByName
}
