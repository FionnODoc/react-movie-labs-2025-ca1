import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import Spinner from "../components/spinner";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PopularMoviesPage = () => {
  const [page, setPage] = useState(1);
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["popular", { page }],
    queryFn: getPopularMovies,
    keepPreviousData: true,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;
  const totalPages = Math.min(data.total_pages, 500);

  return (
    <>
      <PageTemplate
        title="Popular Movies"
        movies={movies}
        action={(movie) => <AddToFavoritesIcon movie={movie} />}
      />
      <Stack spacing={2} alignItems="center" sx={{ my: 2 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="secondary"
        />
      </Stack>
    </>
  );
};

export default PopularMoviesPage;
