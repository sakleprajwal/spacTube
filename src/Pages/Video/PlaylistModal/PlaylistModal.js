import AddPlaylistForm from "../../../Components/AddPlaylistForm/AddPlaylistForm";
import { useVideos } from "../../../Contexts/video-context/video-context";
import { checkVideoInPlayList } from "../Utils";
import styles from "./Playlist.module.css";
import PlaylistItem from "./PlaylistItem";

export default function ({ video }) {
  const { playlists, addVideoToPlaylist } = useVideos();

  return (
    <div className={styles.modal}>
      <div className={`${styles.playlists}`}>
        {playlists.length === 0 ? (
          "Create a playlist"
        ) : (
          <>
            {playlists.map((playlist) => (
              <PlaylistItem key={playlist._id}
                videoInPlaylist={checkVideoInPlayList(video, playlist)}
                video={video}
                playlist={playlist}
              />
            ))}
          </>
        )}
      </div>
      <div className={styles.form__container}>
        <AddPlaylistForm />
      </div>
    </div>
  );
}