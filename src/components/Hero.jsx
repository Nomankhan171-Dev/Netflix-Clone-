import { Info, Play } from 'lucide-react'
import { imageUrl } from '../api'

export default function Hero({ item, onMore }) {
  if (!item) return <div className="h-[68vh] min-h-[520px] animate-pulse bg-zinc-900" />

  const title = item.title || item.name
  const text = item.overview || 'Discover popular movies and shows powered by TMDB.'

  return (
    <section id="home" className="relative h-[72vh] min-h-[560px] overflow-hidden">
      <img
        src={imageUrl(item.backdrop_path, 'original')}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/25" />
      <div className="relative mx-auto flex h-full max-w-[1600px] items-end px-5 pb-20 md:px-10 md:pb-24">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur">
            Featured
          </div>
          <h1 className="text-4xl font-black leading-none md:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-5 line-clamp-3 max-w-xl text-sm leading-6 text-zinc-200 md:text-base">{text}</p>
          <div className="mt-6 flex gap-3">
            <button className="flex items-center gap-2 rounded-md bg-white px-5 py-3 font-bold text-black hover:bg-zinc-200">
              <Play size={20} fill="currentColor" /> Play
            </button>
            <button onClick={() => onMore(item)} className="flex items-center gap-2 rounded-md bg-zinc-500/55 px-5 py-3 font-semibold backdrop-blur hover:bg-zinc-500/75">
              <Info size={20} /> More Info
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
