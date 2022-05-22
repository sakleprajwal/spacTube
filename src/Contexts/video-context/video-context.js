import {
    createContext,
    useContext,
    useReducer,
    useState,
    useEffect,
  } from "react";
import axios from "axios";
import { videosReducer } from "./videosReducer";
import { useAuth } from "../authentication-context/auth-context";
  
const VideosContext = createContext();
  
const VideosProvider = ({ children }) => {

    const [videoState, videoDispatch] = useReducer(videosReducer, {
      category: "All",
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

    const videosToShow = filterByCategory(videoState, videos);
    console.log(videosToShow);

    const changeCategory = (name) => {
        videoDispatch({
          type: "FILTER_BY_CATEGORY",
          payload: name,
        });
      };

    return (
        <VideosContext.Provider value={{
            videos: videosToShow,
            category: videoState.category,
            changeCategory,
            videoDispatch,
          }}>
          {children}
        </VideosContext.Provider>
      );
    };
    
    const useVideos = () => useContext(VideosContext);
    
    export { VideosProvider, useVideos };  