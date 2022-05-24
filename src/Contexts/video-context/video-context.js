import {createContext, useContext, useReducer, useState, useEffect} from "react";
import axios from "axios";
import { videosReducer } from "./videosReducer";
import { useAuth } from "../authentication-context/auth-context";
  
const VideosContext = createContext();
  
const VideosProvider = ({ children }) => {

    const [videoState, videoDispatch] = useReducer(videosReducer, {
		category: "All",
		likedVideos: [],
		watchLater: [],
		history: [],
		playlists: [],
	});

    const [videos, setVideos] = useState([]);

    const { isLoggedIn } = useAuth();

    useEffect(() => {
      (async () => {
        try {
          const response = await axios.get("/api/videos");
          if (response.status === 200) {
            setVideos(response?.data?.videos);
          }
        } catch (e) {
          console.error(e);
        }
      })();
    }, []);

    const filterByCategory = (videoState, videos) => {
		if(videoState.category === "All")
		return videos
        return videos.filter(video => video.category === videoState.category)
    }

	const changeCategory = (name) => {
        videoDispatch({
          type: "FILTER_BY_CATEGORY",
          payload: name,
        });
    };
	
    const videosToShow = filterByCategory(videoState, videos);

	const addToLikedVideos = async (video) => {
		if (isLoggedIn) {
		  if (videoState.likedVideos.some((likedVideo) => likedVideo._id === video._id)) {
			removeFromLikedVideos(video);
		  } else {
			try {
			  const response = await axios.post(
				`/api/user/likes`,
				{ video },
				{ headers: {authorization: localStorage.getItem("spacTube-token")} }
			  );
			  console.log(response.data);
			  if (response.status === 201) {
				videoDispatch({ type: "ADD_TO_LIKED", payload: response?.data?.likes});
				console.log("Video Liked")
			  }
			} catch (e) {
			  console.error(e);
			}
		  }
		}
	};

	const removeFromLikedVideos = async (video) => {
		try {
		  const response = await axios.delete(`/api/user/likes/${video._id}`, {
			headers: { authorization: localStorage.getItem("spacTube-token"), },
		  });
		  if (response.status === 200) {
			videoDispatch({ type: "REMOVE_FROM_LIKED", payload: response?.data?.likes, });
			console.log("Video removed from Liked")
		  }
		} catch (e) {
		  console.log(e)
		}
	};

	const addToWatchlater = async (video) => {
		if (isLoggedIn) {
		  if (videoState.watchLater.some((likedVideo) => likedVideo._id === video._id)) {
			removeFromWatchlater(video);
		  } else {
			try {
			  const response = await axios.post(`/api/user/watchlater`,
				{ video },
				{ headers: { authorization: localStorage.getItem("spacTube-token"), }, }
			  );
			  console.log(response.data);
			  if (response.status === 201) {
				videoDispatch({ type: "ADD_TO_WATCHLATER", payload: response?.data?.watchlater, });
				console.log("Added to watch later")
			  }
			} catch (e) {
			  console.error(e);
			}
		  }
		}
	};

	const removeFromWatchlater = async (video) => {
		try {
		  const response = await axios.delete(`/api/user/watchlater/${video._id}`, {
			headers: { authorization: localStorage.getItem("spacTube-token"), },
		  });
		  if (response.status === 200) {
			videoDispatch({ type: "REMOVE_FROM_WATCHLATER", payload: response?.data?.watchlater, });
			console.log("Removed from WatchLater")
		  }
		} catch (e) {
		  console.log(e)
		}
	};

	const addToHistory = async (video) => {
		if (isLoggedIn) {
		  try {
			const response = await axios.post(`/api/user/history`,
			  { video },
			  { headers: { authorization: localStorage.getItem("spacTube-token")} }
			);
			console.log(response);
			if (response.status === 201) {
			  videoDispatch({ type: "ADD_TO_HISTORY", payload: response?.data?.history, });
			}
		  } catch (e) {
			console.error(e);
		  }
		}
	};
	
	const removeFromHistory = async (video) => {
		try {
		  const response = await axios.delete(`/api/user/history/${video._id}`, {
			headers: { authorization: localStorage.getItem("spacTube-token"), },
		  });
		  if (response.status === 200) {
			videoDispatch({  type: "REMOVE_FROM_HISTORY", payload: response?.data?.history, });
			console.log("Removed from history")
		  }
		} catch (e) {
		  console.log(e)
		}
	};

    return (
        <VideosContext.Provider value={{
            videos: videosToShow,
			category: videoState.category,
			likedVideos: videoState.likedVideos,
			watchLater: videoState.watchLater,
			history: videoState.history,
			playlists: videoState.playlists,
            changeCategory,
			addToLikedVideos,
			removeFromLikedVideos,
			addToWatchlater,
			removeFromWatchlater,
			addToHistory,
			removeFromHistory,
            videoDispatch,
          }}>
          {children}
        </VideosContext.Provider>
      );
    };
    
    const useVideos = () => useContext(VideosContext);
    
    export { VideosProvider, useVideos };  