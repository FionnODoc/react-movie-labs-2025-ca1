import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

const MovieCast = ({ movieId }) => {
  const navigate = useNavigate();
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["credits", { id: movieId }],
    queryFn: getMovieCredits,
  });

  if (isPending) return <Spinner />;
  if (isError) return <Typography variant="h6">{error.message}</Typography>;

  const cast = (data?.cast || []).slice(0, 12);

  return (
    <>
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Cast</Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {cast.map((p) => (
          <Chip
            key={p.id}
            label={p.name}
            onClick={() => navigate(`/people/${p.id}`)}
            clickable
          />
        ))}
      </Stack>
    </>
  );
};

export default MovieCast;
