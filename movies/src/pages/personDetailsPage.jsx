import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPerson, getPersonMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import ImageListItem from "@mui/material/ImageListItem";
import MovieList from "../components/movieList";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const PersonDetailsPage = () => {
  const { id } = useParams();
  const personQuery = useQuery({ queryKey: ["person", { id }], queryFn: getPerson });
  const creditsQuery = useQuery({ queryKey: ["person_credits", { id }], queryFn: getPersonMovieCredits });

  if (personQuery.isPending || creditsQuery.isPending) return <Spinner />;
  if (personQuery.isError) return <Typography variant="h6">{personQuery.error.message}</Typography>;
  if (creditsQuery.isError) return <Typography variant="h6">{creditsQuery.error.message}</Typography>;

  const person = personQuery.data;
  const movies = creditsQuery.data?.cast || [];

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid size={{ xs: 12, md: 3 }}>
        {person.profile_path && (
          <ImageListItem>
            <img src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`} alt={person.name} />
          </ImageListItem>
        )}
        <Typography variant="h5" sx={{ mt: 1 }}>{person.name}</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>{person.biography || ""}</Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 9 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Movies</Typography>
        <MovieList movies={movies} action={(m) => <AddToFavoritesIcon movie={m} />} />
      </Grid>
    </Grid>
  );
};

export default PersonDetailsPage;
