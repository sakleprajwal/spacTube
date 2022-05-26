import Empty from "../../Components/Empty/Empty";
import { useVideos } from "../../Contexts/video-context/video-context";
import styles from "./History.module.css";
import HistoryCard from "./HistoryCard";

export default function () {

  const { history, clearHistory } = useVideos();

  return (
    <div className="content-container">
      <div className={styles.container}>
        {history.length === 0 ? (
          <Empty text="Looks like you are new here or you have cleared your watch history 👀" />
        ) : (
          <div>
            <div className={styles.heading}>
            <h2 className='page-title'>History</h2>
              <button onClick={() => clearHistory()}>
                Clear history
              </button>
            </div>
            <div className={styles.history__items}>
              {history.map((video) => (
                <HistoryCard key={video._id} video={video} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}