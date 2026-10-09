import { X, Play } from 'lucide-react'
import { imageUrl } from '../api'

export default function Modal({ item, onClose }) {
  if (!item) return null

  const title = item.title || item.name
  const trailer = item.videos?.results?.find(v => v.site === 'YouTube' && v.type === 'Trailer')

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full bg-black/70 p-2 hover:bg-black"><X /></button>
        <div className="relative h-72 md:h-[420px]">
          <img src={imageUrl(item.backdrop_path || item.poster_path, 'original')} alt={title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/20" />
        </div>
        <div className="p-6 md:p-8">
          <h3 className="text-3xl font-black md:text-4xl">{title}</h3>
          <div className="mt-3 flex flex-wrap gap-3 text-sm text-zinc-400">
            {item.release_date && <span>{item.release_date.slice(0,4)}</span>}
            {item.first_air_date && <span>{item.first_air_date.slice(0,4)}</span>}
            {item.vote_average && <span className="text-green-400">{item.vote_average.toFixed(1)} rating</span>}
          </div>
          <p className="mt-5 leading-7 text-zinc-300">{item.overview}</p>
          {trailer && (
            <a href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 font-bold text-black">
              <Play size={18} fill="currentColor" /> Watch Trailer
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
