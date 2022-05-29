import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useVideos } from "../../Contexts/video-context/video-context";
import styles from "./History.module.css";

export default function ({ video }) {
  const { removeFromHistory } = useVideos();

  return (
    
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
            <div className={styles.card__description}>{video?.description}</div>
          </div>
        </Link>
        <div
          className={styles.icon}
          onClick={() => removeFromHistory(video)}
          title="Remove video from watch history">
          <AiOutlineDelete />
        </div>
      </div>
    </div>
  );
}