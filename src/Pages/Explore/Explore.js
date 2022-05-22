import React from 'react';
import { Link } from 'react-router-dom';
import { useVideos } from '../../Contexts/video-context/video-context';
import styles from './Explore.module.css'
import Filter from './Filter/Filter';

const Explore = () => {
    const { videos } = useVideos();

  return (
    <div className='flex-column'>
      <Filter />
      <div className={styles.videos}>
        {videos.map((video) => (
          <div className={styles.card} key={video._id}>
          <Link to={`/video/${video.videoId}`}>
            <div>
              <img src={video.thumbnail} alt={video.title} className={styles.card__thumbnail} />
            </div>
            <div className={styles.card__description}>
              <div className={styles.card__channel__icon__container}>
                <img
                  src={video.channelIcon}
                  alt={video.channelTitle}
                  className={styles.card__channel__icon}
                />
              </div>
              <div className={styles.card__video__info}>
                <div className={styles.card__video__title}>{video.title}</div>
                <div className={styles.card__video__publisher}>{video.channelTitle}</div>
              </div>
            </div>
          </Link>
        </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;