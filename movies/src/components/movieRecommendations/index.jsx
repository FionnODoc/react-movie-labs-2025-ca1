import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieRecommendations } from "../../api/tmdb-api";
import Spinner from "../spinner";
import Typography from "@mui/material/Typography";
import MovieList from "../movieList";
import AddToFavoritesIcon from "../cardIcons/addToFavorites";

const MovieRecommendations = ({ movieId }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["recommendations", { id: movieId }],
    queryFn: getMovieRecommendations,
  });

  if (isPending) return <Spinner />;
  if (isError) return <Typography variant="h6">{error.message}</Typography>;

  const movies = data?.results || [];

  return (
    <>
      <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Recommendations</Typography>
      <MovieList movies={movies} action={(m) => <AddToFavoritesIcon movie={m} />} />
    </>
  );
};

export default MovieRecommendations;
