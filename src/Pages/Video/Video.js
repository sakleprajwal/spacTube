import { useState } from "react";
import ReactPlayer from "react-player";
import styles from "./Video.module.css";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineWatchLater, MdOutlinePlaylistAdd } from "react-icons/md";
import { useParams } from "react-router-dom";
import {getVideoData, getRelatedVideos, isVideoLiked, isVideoInWatchLater} from "./Utils";
import { useVideos } from "../../Contexts/video-context/video-context";
import VideoCard from "../../Components/VideoCard/VideoCard";
import Modal from "../../Components/Modal/Modal";
import PlaylistModal from "./PlaylistModal/PlaylistModal";

export default function () {
  const { videoId } = useParams();
  const {videos, addToLikedVideos, likedVideos, addToWatchlater, watchLater, addToHistory} = useVideos();

  const video = getVideoData(videoId, videos);
  const relatedVideos = getRelatedVideos(video?.category, videos);
  const isLiked = isVideoLiked(video, likedVideos);
  const isInWatchlater = isVideoInWatchLater(video, watchLater);

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  const actions = [
    {
      id: 1,
      icon: <AiOutlineLike />,
      title: "Like the video",
      name: "Like",
      clickHandler: () => addToLikedVideos(video),
      isAlreadyExists: isLiked,
    },
    {
      id: 2,
      icon: <MdOutlineWatchLater />,
      title: "Add Video to Watch Later list",
      name: "Watch Later",
      clickHandler: () => addToWatchlater(video),
      isAlreadyExists: isInWatchlater,
    },
    {
      id: 3,
      icon: <MdOutlinePlaylistAdd />,
      title: "Add Video to a playlist",
      name: "Add to Playlist",
      clickHandler: () => setShowModal(true),
    },
  ];

  return (
    <div>
      <div className={styles.video__container}>
        <div className={styles.video__details}>
          <div>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoId}`}
              controls={true}
              className={styles.video}
              onStart={() => addToHistory(video)}
              width="100%"
              height="100%"
            />
          </div>
          <div className={styles.actions__container}>
            {actions.map((action) => (
                <div key={action.id} className={`${styles.action} ${action.isAlreadyExists && styles.selected}`}
                title={action.title} onClick={action.clickHandler}>
                    <div className={styles.action__icon}>{action.icon}</div>
                </div>
            ))}
          </div>
          <div className={styles.video__information__container}>
            <div className={styles.channel__icon}>
              <img
                src={video?.channelIcon}
                alt={video?.channelTitle}
                className={styles.video__icon}
              />
            </div>
            <div className={styles.video__information}>
              <h2 className={styles.video__title}>{video?.title}</h2>
              <div className={styles.video__description}>
                {video?.description}
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3>Related Videos</h3>
          <div className={styles.related__videos}>
            {relatedVideos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        </div>
      </div>
      <Modal showModal={showModal} header="Playlist" closeModal={closeModal}>
        <PlaylistModal video={video} />
      </Modal>
    </div>
  );
}