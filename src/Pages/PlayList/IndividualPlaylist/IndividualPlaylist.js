import { Link, useParams } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "./IndividualPlaylist.module.css";
import { useVideos } from "../../../Contexts/video-context/video-context";
import Empty from "../../../Components/Empty/Empty";

export default function () {
  const { playlistId } = useParams();
  const { playlists, removeVideoFromPlaylist } = useVideos();

  const playlist = playlists.find((playlist) => playlist._id === playlistId);

  return (
    <div className="content-container">
      <div className={styles.playlist__title}>{playlist?.title}</div>
      <div className={styles.playlist__description}>
        {playlist?.description}
      </div>
      <div className={styles.playlist__videos__container}>
        {playlist?.videos.length === 0 && (
          <Empty text="Add some videos to playlist" />
        )}
        {playlist?.videos.map((video) => (
          <div className={styles.card}>
            <div className={styles.card__thumbnail}>
              <Link to={`/video/${video.videoId}`}>
                <img src={video?.thumbnail} alt={video?.title} />
              </Link>
            </div>
            <div className={styles.card__description__container}>
              <Link to={`/video/${video.videoId}`}>
                <div>
                  <div className={styles.card__title}>{video?.title}</div>
                  <div className={styles.card__description}>
                    {video?.description}
                  </div>
                </div>
              </Link>
              <div
                className={styles.icon}
                onClick={() => removeVideoFromPlaylist(playlist._id, video)}>
                <AiOutlineDelete />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}