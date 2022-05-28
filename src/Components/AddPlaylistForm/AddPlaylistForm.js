import { useState } from "react";
import { useVideos } from "../../Contexts/video-context/video-context";
import styles from "./AddPlaylistForm.module.css";

export default function () {
  const [playlistForm, setPlaylistForm] = useState({
    title: "",
    description: "",
  });

  const { addNewPlaylist } = useVideos();

  const handleChange = (event) => {
    setPlaylistForm({
      ...playlistForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewPlaylist(playlistForm);
    setPlaylistForm({
      title: "",
      description: "",
    });
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.playlist__input}
          type="text"
          value={playlistForm.title}
          name="title"
          placeholder="Title of Playlist"
          required
          onChange={(event) => handleChange(event)}
        />
        <input
        className={styles.playlist__input}
          type="text"
          value={playlistForm.description}
          name="description"
          placeholder="Description"
          onChange={(event) => handleChange(event)}
        />
        
        <button className={styles.playlist__button}>Create New Playlist</button>
      </form>
    </div>
  );
}