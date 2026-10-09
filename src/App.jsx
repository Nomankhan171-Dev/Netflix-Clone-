import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Row from './components/Row'
import Modal from './components/Modal'
import { tmdb } from './api'

export default function App() {
  const [data, setData] = useState({
    trending: [],
    popularMovies: [],
    topRatedMovies: [],
    popularTV: [],
    nowPlaying: [],
  })
  const [selected, setSelected] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const [trending, popularMovies, topRatedMovies, popularTV, nowPlaying] = await Promise.all([
          tmdb.trending(),
          tmdb.popularMovies(),
          tmdb.topRatedMovies(),
          tmdb.popularTV(),
          tmdb.nowPlaying(),
        ])
        setData({
          trending: trending.results,
          popularMovies: popularMovies.results,
          topRatedMovies: topRatedMovies.results,
          popularTV: popularTV.results,
          nowPlaying: nowPlaying.results,
        })
      } catch (e) {
        setError(e.message)
      }
    }
    load()
  }, [])

  const hero = useMemo(() => data.trending.find(x => x.backdrop_path) || data.popularMovies[0], [data])

  async function openDetails(item) {
    try {
      const type = item.media_type || (item.title ? 'movie' : 'tv')
      const details = await tmdb.details(type, item.id)
      setSelected({ ...item, ...details })
    } catch {
      setSelected(item)
    }
  }

  async function handleSearch(e) {
    e.preventDefault()
    const q = new FormData(e.currentTarget).get('search')?.trim()
    if (!q) return
    try {
      const result = await tmdb.search(q)
      setSearchResults(result.results.filter(x => ['movie','tv'].includes(x.media_type)))
      setTimeout(() => document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' }), 50)
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar onSearch={handleSearch} />
      {error && (
        <div className="fixed left-1/2 top-24 z-[80] -translate-x-1/2 rounded-lg border border-red-500/30 bg-red-950/90 px-4 py-3 text-sm text-red-200 shadow-xl">
          {error}. Add your TMDB key in a <b>.env</b> file.
        </div>
      )}

      <Hero item={hero} onMore={openDetails} />

      <div className="-mt-10 relative z-10 pb-14">
        {searchResults.length > 0 && (
          <Row id="search-results" title="Search Results" items={searchResults} onSelect={openDetails} />
        )}
        <Row id="trending" title="Trending This Week" items={data.trending} onSelect={openDetails} />
        <Row id="movies" title="Popular Movies" items={data.popularMovies} onSelect={openDetails} />
        <Row title="Top Rated Movies" items={data.topRatedMovies} onSelect={openDetails} />
        <Row id="tv" title="Popular TV Shows" items={data.popularTV} onSelect={openDetails} />
        <Row title="Now Playing" items={data.nowPlaying} onSelect={openDetails} />
      </div>

      <footer className="border-t border-white/5 px-5 py-10 text-center text-sm text-zinc-500">
        Movie data provided by TMDB. This product is not endorsed or certified by TMDB.
      </footer>

      <Modal item={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
