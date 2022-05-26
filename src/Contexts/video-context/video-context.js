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

	const clearHistory = async () => {
		try {
		  const response = await axios.delete(`/api/user/history/all`, { headers: { authorization: localStorage.getItem("spacTube-token") } });
		  if (response.status === 200) {
			videoDispatch({  type: "CLEAR_HISTORY", payload: response?.data?.history, });
			console.log("History cleared")
		  }
		} catch (e) {
		  console.log(e)
		}
	  };


	const addNewPlaylist = async (playlistForm) => {
		if (isLoggedIn) {
		  try {
			const response = await axios.post("/api/user/playlists", { playlist: playlistForm },
			  {headers: { authorization: localStorage.getItem("spacTube-token") }} );
			videoDispatch({ type: "CREATE_PLAYLIST", payload: response?.data?.playlists, });
			console.log("Playlist is created")
		  } catch (e) {
			console.error(e);
		  }
		} else {
		  console.log("Please login")
		}
	  };
	
	  const addVideoToPlaylist = async (inputPlaylist, video) => {
		const itALreadyExists = inputPlaylist?.videos.some( (iVideo) => iVideo._id === video._id);
		if (itALreadyExists) {
		  removeVideoFromPlaylist(inputPlaylist._id, video);
		} else {
		  if (isLoggedIn) {
			try {
			  const response = await axios.post(`/api/user/playlists/${inputPlaylist._id}`, { video },
				{ headers: {authorization: localStorage.getItem("spacTube-token")} } );
			  const { playlist } = response?.data;
			  const updatedPlaylists = videoState.playlists.map((iPlaylist) =>
				iPlaylist._id === playlist._id
				  ? { ...iPlaylist, videos: playlist.videos }
				  : { ...iPlaylist }
			  );
			  videoDispatch({ type: "ADD_VIDEO_TO_PLAYLIST", payload: updatedPlaylists, });
			  console.log("Video added to playlist")
			} catch (e) {
			  console.error(e);
			}
		  } else {
			console.log("Please login")
		  }
		}
	  };
	
	  const removeVideoFromPlaylist = async (playlistId, video) => {
		if (isLoggedIn) {
		  try {
			const response = await axios.delete(`/api/user/playlists/${playlistId}/${video._id}`,
			  { headers: { authorization: localStorage.getItem("spacTube-token") } } );
			const { playlist } = response?.data;
			const updatedPlaylists = videoState.playlists.map((iPlaylist) =>
			  iPlaylist._id === playlist._id
				? { ...iPlaylist, videos: playlist.videos }
				: { ...iPlaylist }
			);
			videoDispatch({ type: "REMOVE_VIDEO_FROM_PLAYLIST", payload: updatedPlaylists });
			console.log("Video removed from playlist")
		  } catch (e) {
			console.error(e);
		  }
		} else {
		  console.log("Please login")
		}
	  };
	
	  const deletePlaylist = async (playlist) => {
		if (isLoggedIn) {
		  try {
			const response = await axios.delete(`/api/user/playlists/${playlist._id}`,
			  { headers: { authorization: localStorage.getItem("spacTube-token") } } );
			videoDispatch({ type: "DELETE_PLAYLIST", payload: response?.data?.playlists, });
			console.log("Playlist is deleted")
		  } catch (e) {
			console.error(e);
		  }
		} else {
		  console.log("Please login")
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
			clearHistory,
			addNewPlaylist,
			addVideoToPlaylist,
			removeVideoFromPlaylist,
			deletePlaylist,
            videoDispatch,
          }}>
          {children}
        </VideosContext.Provider>
      );
    };
    
    const useVideos = () => useContext(VideosContext);
    
    export { VideosProvider, useVideos };  