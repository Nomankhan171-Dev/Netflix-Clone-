import { imageUrl } from '../api'

export default function Row({ title, items = [], onSelect, id }) {
  return (
    <section id={id} className="mx-auto max-w-[1600px] px-5 py-4 md:px-10">
      <div className="mb-3 flex items-end justify-between">
        <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
        <span className="text-xs text-zinc-500">Scroll to explore</span>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-3">
        {items.filter(x => x.poster_path || x.backdrop_path).map((item) => (
          <button
            key={`${item.media_type || 'item'}-${item.id}`}
            onClick={() => onSelect(item)}
            className="group relative min-w-[150px] overflow-hidden rounded-lg bg-zinc-900 text-left transition duration-300 hover:z-10 hover:scale-105 md:min-w-[190px]"
          >
            <img
              src={imageUrl(item.poster_path || item.backdrop_path, 'w500')}
              alt={item.title || item.name}
              className="aspect-[2/3] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/65 to-transparent p-3 pt-14 opacity-0 transition group-hover:opacity-100">
              <div className="line-clamp-1 text-sm font-bold">{item.title || item.name}</div>
              <div className="mt-1 text-xs text-zinc-300">
                {item.vote_average ? `${item.vote_average.toFixed(1)} / 10` : 'TMDB'}
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
