import styles from "../LikedVideos/LikedVideos.module.css";
import { useVideos } from "../../Contexts/video-context/video-context";
import Empty from "../../Components/Empty/Empty";
import VideoCard from "../../Components/VideoCard/VideoCard";

export default function () {

  const { watchLater } = useVideos();

  return (
    <div className="content-container">
      {watchLater?.length === 0 ? (
        <Empty text="There are no videos to be 'Watched Later'. Visit the below link and add some to watch later" />
      ) : (
        <div className={styles.liked__container}>
          <div className={styles.liked__info}>
            <div className={styles.liked__info__text}>
            You have {watchLater.length} videos listed to Watch Later.
            </div>
          </div>
          <div className={styles.liked}>
            {watchLater.map((watchLaterVideo) => (
              <VideoCard key={watchLaterVideo._id} video={watchLaterVideo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}