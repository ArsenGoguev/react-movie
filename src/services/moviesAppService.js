const apiURL = 'https://api.themoviedb.org/3/'
const apiKey = '8a8be1fee5490beecdd49d89d9208916'
let guestSessionID

if (localStorage.getItem('guestSessionID')) guestSessionID = localStorage.getItem('guestSessionID')

export const createGuestSession = () =>
  interactionWithData(`${apiURL}authentication/guest_session/new?api_key=${apiKey}`).then((json) => {
    guestSessionID = json.guest_session_id
    localStorage.setItem('guestSessionID', guestSessionID)
    return guestSessionID
  })

const interactionWithData = async (url, options) => {
  let res
  if (!options) {
    res = await fetch(url)
  } else {
    res = await fetch(url, options)
  }
  if (!res.ok) throw new Error(`Error ${res.status}`)
  return res.json()
}

export const getPopularMovies = (page = 1) =>
  interactionWithData(`${apiURL}movie/popular?api_key=${apiKey}&language=en-US&page=${page}`)

export const searchMovies = (query, page = 1) =>
  interactionWithData(
    `${apiURL}search/movie?include_adult=false&language=en-EN&api_key=${apiKey}&query=${query}&page=${page}`
  )

export const setMovieRating = (rate, movieID) => {
  const url = `${apiURL}movie/${movieID}/rating?api_key=${apiKey}&guest_session_id=${guestSessionID}`
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
  const url = `${apiURL}movie/${movieID}/rating?api_key=${apiKey}&guest_session_id=${guestSessionID}`
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
  }
  return interactionWithData(url, options)
}

export const getRatedMovies = (page = 1) =>
  interactionWithData(`${apiURL}guest_session/${guestSessionID}/rated/movies?api_key=${apiKey}&page=${page}`)

export const getGenres = () => interactionWithData(`${apiURL}genre/movie/list?api_key=${apiKey}`)
