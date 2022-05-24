import React from 'react';
import VideoCard from '../../Components/VideoCard/VideoCard';
import { useVideos } from '../../Contexts/video-context/video-context';
import Filter from './Filter/Filter';
import styles from '../../Components/VideoCard/VideoCard.module.css'

const Explore = () => {
    const { videos } = useVideos();

  return (
    <div className='flex-column'>
      <Filter />
      <div className={styles.videos}>
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default Explore;