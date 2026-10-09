import { Search, Bell, UserRound } from 'lucide-react'

export default function Navbar({ onSearch }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-black/95 via-black/70 to-transparent">
      <div className="mx-auto flex max-w-[1600px] items-center gap-7 px-5 py-4 md:px-10">
        <div className="text-2xl font-black tracking-tight text-red-600 md:text-3xl">CINEVERSE</div>
        <nav className="hidden gap-5 text-sm font-medium text-zinc-200 md:flex">
          <a href="#home" className="hover:text-white">Home</a>
          <a href="#movies" className="hover:text-white">Movies</a>
          <a href="#tv" className="hover:text-white">TV Shows</a>
          <a href="#trending" className="hover:text-white">Trending</a>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <form onSubmit={onSearch} className="hidden items-center rounded-full border border-white/15 bg-black/30 px-3 py-2 backdrop-blur md:flex">
            <Search size={17} className="text-zinc-400" />
            <input
              name="search"
              className="w-44 bg-transparent px-2 text-sm outline-none placeholder:text-zinc-500 lg:w-64"
              placeholder="Search movies or shows..."
            />
          </form>
          <button className="rounded-full p-2 hover:bg-white/10"><Bell size={20} /></button>
          <button className="rounded-full bg-zinc-800 p-2"><UserRound size={20} /></button>
        </div>
      </div>
    </header>
  )
}
