const _apiURL = 'https://api.themoviedb.org/3/'
const _apiKey = '8a8be1fee5490beecdd49d89d9208916'
let guestSessionID

if (localStorage.getItem('guestSessionID')) guestSessionID = localStorage.getItem('guestSessionID')

export const createGuestSession = () => {
  return interactionWithData(`${_apiURL}authentication/guest_session/new?api_key=${_apiKey}`).then((json) => {
    guestSessionID = json.guest_session_id
    localStorage.setItem('guestSessionID', guestSessionID)
    return guestSessionID
  })
}

const interactionWithData = async (url, options) => {
  let res
  if (!options) {
    res = await fetch(url)
  } else {
    res = await fetch(url, options)
  }
  if (!res.ok) throw new Error(`Error ${res.status}`)
  return await res.json()
}

export const getPopularMovies = (page = 1) => {
  return interactionWithData(`${_apiURL}movie/popular?api_key=${_apiKey}&language=en-US&page=${page}`)
}

export const searchMovies = (query, page = 1) => {
  return interactionWithData(
    `${_apiURL}search/movie?include_adult=false&language=en-EN&api_key=${_apiKey}&query=${query}&page=${page}`
  )
}

export const setMovieRating = (rate, movieID) => {
  const url = `${_apiURL}movie/${movieID}/rating?api_key=${_apiKey}&guest_session_id=${guestSessionID}`
  const body = {
    value: rate,
  }
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(body),
  }
  return interactionWithData(url, options)
}

export const deleteMovieRate = (movieID) => {
  const url = `${_apiURL}movie/${movieID}/rating?api_key=${_apiKey}&guest_session_id=${guestSessionID}`
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
  }
  return interactionWithData(url, options)
}

export const getRatedMovies = (page = 1) => {
  return interactionWithData(`${_apiURL}guest_session/${guestSessionID}/rated/movies?api_key=${_apiKey}&page=${page}`)
}

export const getGenres = () => {
  return interactionWithData(`${_apiURL}genre/movie/list?api_key=${_apiKey}`)
}
