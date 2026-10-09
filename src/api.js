const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

async function request(path) {
  if (!API_KEY) throw new Error('Missing VITE_TMDB_API_KEY')
  const joiner = path.includes('?') ? '&' : '?'
  const res = await fetch(`${BASE_URL}${path}${joiner}api_key=${API_KEY}`)
  if (!res.ok) throw new Error(`TMDB request failed: ${res.status}`)
  return res.json()
}

export const tmdb = {
  trending: () => request('/trending/all/week'),
  popularMovies: () => request('/movie/popular'),
  topRatedMovies: () => request('/movie/top_rated'),
  popularTV: () => request('/tv/popular'),
  nowPlaying: () => request('/movie/now_playing'),
  details: (type, id) => request(`/${type}/${id}?append_to_response=videos,credits`),
  search: (query) => request(`/search/multi?query=${encodeURIComponent(query)}`),
}

export const imageUrl = (path, size = 'w500') =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : ''
