import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import MovieList from "../components/movieList";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const SearchMoviesPage = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["search", { query, page }],
    queryFn: searchMovies,
    enabled: query.trim().length > 0,
    keepPreviousData: true,
  });

  const movies = data?.results || [];
  const totalPages = data ? Math.min(data.total_pages, 500) : 0;

  return (
    <>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 2 }}>
        <Typography variant="h6">Search</Typography>
        <TextField
          id="search"
          placeholder="Type to search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
        />
      </Stack>
      {isPending && query ? <Spinner /> : null}
      {isError ? <Typography variant="h6">{error.message}</Typography> : null}
      <MovieList movies={movies} action={(m) => <AddToFavoritesIcon movie={m} />} />
      {totalPages > 1 && (
        <Stack spacing={2} alignItems="center" sx={{ my: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="secondary"
          />
        </Stack>
      )}
    </>
  );
};

export default SearchMoviesPage;
