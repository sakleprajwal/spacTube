import {createContext, useContext, useReducer, useState, useEffect} from "react";
import axios from "axios";
import { videosReducer } from "./videosReducer";
import { useAuth } from "../authentication-context/auth-context";
import Toaster from "../../Components/Toaster/Toaster";
  
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
			Toaster({message: "Something went wrong.", type: "error"});
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
			  if (response.status === 201) {
				videoDispatch({ type: "ADD_TO_LIKED", payload: response?.data?.likes});
				Toaster({message: "Video is liked", type: "success"});
			  }
			} catch (e) {
				Toaster({message: "Please login and try again.", type: "error"});
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
			Toaster({message: "Video is unliked", type: "success"});
		  }
		} catch (e) {
			Toaster({message: "Please login and try again.", type: "error"});
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
			  if (response.status === 201) {
				videoDispatch({ type: "ADD_TO_WATCHLATER", payload: response?.data?.watchlater, });
				Toaster({message: "Added to watch later.", type: "success"});
			  }
			} catch (e) {
				Toaster({message: "Please login and try again.", type: "error"});
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
			Toaster({message: "Video is removed from watch later.", type: "success"});
		  }
		} catch (e) {
			Toaster({message: "Please login and try again.", type: "error"});
		}
	};

	const addToHistory = async (video) => {
		if (isLoggedIn) {
		  try {
			const response = await axios.post(`/api/user/history`,
			  { video },
			  { headers: { authorization: localStorage.getItem("spacTube-token")} }
			);
			if (response.status === 201) {
			  videoDispatch({ type: "ADD_TO_HISTORY", payload: response?.data?.history, });
			}
		  } catch (e) {
			Toaster({message: "Please login and try again.", type: "error"});
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
			Toaster({message: "Video is removed from history.", type: "success"});
		  }
		} catch (e) {
			Toaster({message: "Please login and try again.", type: "error"});
		}
	};

	const clearHistory = async () => {
		try {
		  const response = await axios.delete(`/api/user/history/all`, { headers: { authorization: localStorage.getItem("spacTube-token") } });
		  if (response.status === 200) {
			videoDispatch({  type: "CLEAR_HISTORY", payload: response?.data?.history, });
			Toaster({message: "Your history is cleared.", type: "success"});
		  }
		} catch (e) {
			Toaster({message: "Please login and try again.", type: "error"});
		}
	  };


	const addNewPlaylist = async (playlistForm) => {
		try {
			const response = await axios.post("/api/user/playlists", { playlist: playlistForm },
			  {headers: { authorization: localStorage.getItem("spacTube-token") }} );
			videoDispatch({ type: "CREATE_PLAYLIST", payload: response?.data?.playlists, });
			Toaster({message: "Playlist is created.", type: "Success"});
		} catch (e) {
			Toaster({message: "Please login and try again.", type: "error"});
		}
	  };
	
	  const addVideoToPlaylist = async (inputPlaylist, video) => {
		const itALreadyExists = inputPlaylist?.videos.some( (iVideo) => iVideo._id === video._id);
		if (itALreadyExists) {
		  removeVideoFromPlaylist(inputPlaylist._id, video);
		} else {
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
			  Toaster({message: "Video is added to playlist.", type: "success"});
			} catch (e) {
				Toaster({message: "Please login and try again.", type: "error"});
			}
		}
	  };
	
	  const removeVideoFromPlaylist = async (playlistId, video) => {
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
			Toaster({message: "Video is removed from playlist.", type: "success"});
		  } catch (e) {
			Toaster({message: "Please login and try again.", type: "error"});
		  }
	  };
	
	  const deletePlaylist = async (playlist) => {
		  try {
			const response = await axios.delete(`/api/user/playlists/${playlist._id}`,
			  { headers: { authorization: localStorage.getItem("spacTube-token") } } );
			videoDispatch({ type: "DELETE_PLAYLIST", payload: response?.data?.playlists, });
			Toaster({message: "Playlist is deleted.", type: "success"});
		  } catch (e) {
			Toaster({message: "Please login and try again.", type: "error"});
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