import React, { useContext } from "react";
import PlaylistAddIconMUI from "@mui/icons-material/PlaylistAdd";
import { MoviesContext } from "../../contexts/moviesContext";

// Exercise 2: Display-only icon for upcoming movies
const PlaylistAddIcon = ({ movie }) => {
	const { addToMustWatch } = useContext(MoviesContext);
	return (
		<span title="Add to playlist">
			<PlaylistAddIconMUI
				color="primary"
				fontSize="large"
				onClick={() => addToMustWatch(movie)}
			/>
		</span>
	);
};

export default PlaylistAddIcon;
