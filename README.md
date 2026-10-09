# CineVerse — React + Tailwind CSS + TMDB

Netflix-inspired movie discovery UI built with React, Tailwind CSS and the TMDB API.

## Features
- Hero banner
- Trending movies & TV shows
- Popular movies
- Top-rated movies
- Popular TV shows
- Now playing
- Search
- Movie/TV detail modal
- Trailer link when available
- Responsive Netflix-style UI

## Setup

1. Extract the ZIP.
2. Open the folder in VS Code.
3. Run:
   npm install
4. Create a file named `.env` in the project root.
5. Add:
   VITE_TMDB_API_KEY=YOUR_TMDB_API_KEY
6. Run:
   npm run dev

## TMDB key
Create a TMDB account, then get your API key from your TMDB account settings.

## Vercel
Add the environment variable:
VITE_TMDB_API_KEY

Then redeploy.

Do not upload your real `.env` file to GitHub.
