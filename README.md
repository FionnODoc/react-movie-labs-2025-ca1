TMDB Client

A Vite React app that explores TMDB data with React Router, Material UI, and TanStack React Query.

Features
- Discover movies
- Upcoming
- Popular
- Top Rated
- Now Playing
- Movie details with images, cast, reviews, and recommendations
- Favorites list
- Person details with their movies
- Search with pagination
- Name and genre filtering, with sorting options

Routes
- /
- /movies/upcoming
- /movies/popular
- /movies/top-rated
- /movies/now-playing
- /movies/favorites
- /movies/:id
- /reviews/:id
- /reviews/form
- /people/:id
- /search

Setup
1. In the movies folder run:
	- npm install
	- npm run dev
2. Create movies/.env.local with:
	- VITE_TMDB_KEY=your_api_key

Tech
- React, Vite
- MUI
- React Router
- TanStack React Query
