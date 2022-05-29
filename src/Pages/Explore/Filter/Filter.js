import { useVideos } from "../../../Contexts/video-context/video-context";
import styles from "./Filter.module.css";

export default function () {
  const { category, changeCategory } = useVideos();

  const filterBlocks = [
    {
      id: 1,
      text: "All",
    },
    {
      id: 2,
      text: "Learning",
    },
    {
      id: 3,
      text: "Music",
    },
    {
      id: 4,
      text: "Sport",
    },
    {
      id: 5,
      text: "Standup",
    },
  ];

  return (
    <div className={styles.filters__container}>
      <div className={styles.filters}>
        {filterBlocks.map((filter) => (
            <div key={filter.id} className={`${styles.filter} ${category === filter.text && styles.filter__active}`}
              onClick={() => changeCategory(filter.text)}>
              {filter.text}
            </div>
        ))}
      </div>
    </div>
  );
}