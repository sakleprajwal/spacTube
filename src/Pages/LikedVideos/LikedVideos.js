import styles from "./LikedVideos.module.css";
import { useVideos } from "../../Contexts/video-context/video-context";
import Empty from "../../Components/Empty/Empty";
import VideoCard from "../../Components/VideoCard/VideoCard";

export default function () {

  const { likedVideos } = useVideos();

  return (
    <div className="content-container">
      {likedVideos?.length === 0 ? (
        <Empty text="Looks like there are no videos that you like. Lets change that. Visit below link" />
      ) : (
        <div className={styles.liked__container}>
          <div className={styles.liked__info}>
            <div className={styles.liked__info__text}>
              You have Liked {likedVideos.length} videos.
            </div>
          </div>
          <div className={styles.liked}>
            {likedVideos.map((likedVideo) => (
              <VideoCard key={likedVideo._id} video={likedVideo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}