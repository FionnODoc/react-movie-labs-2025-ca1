import React from "react";
import PlaylistAddIconMUI from "@mui/icons-material/PlaylistAdd";

// Exercise 2: Display-only icon for upcoming movies
const PlaylistAddIcon = ({ movie }) => {
	return (
		<span title="Add to playlist">
			<PlaylistAddIconMUI color="primary" fontSize="large" />
		</span>
	);
};

export default PlaylistAddIcon;
