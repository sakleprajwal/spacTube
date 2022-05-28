import { useState } from "react";
import styles from "./Playlist.module.css";
import PlaylistCard from "./PlaylistCard";
import { useVideos } from "../../Contexts/video-context/video-context";
import Modal from "../../Components/Modal/Modal";
import AddPlaylistForm from "../../Components/AddPlaylistForm/AddPlaylistForm";

export default function () {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal((t) => !t);
  const closeModal = () => setShowModal(false);

  const { playlists } = useVideos();

  return (
    <div className="content-container">
      <h2 className='page-title'>Playlists</h2>
      <div>
        <button className={styles.create__playlist__btn} onClick={toggleModal}>
          Create playlist
        </button>
        <Modal showModal={showModal} closeModal={closeModal}>
          <AddPlaylistForm />
        </Modal>
      </div>

      <div className={styles.playlists__container}>
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist._id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
}