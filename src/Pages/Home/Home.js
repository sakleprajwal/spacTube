import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { useVideos } from '../../Contexts/video-context/video-context';
import './Home.css'
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [categories, setCategories] = useState([]);
    const {changeCategory} = useVideos();
    const navigate = useNavigate();
    
    useEffect(() => {
        (async () => {
          try {
            const response = await axios.get("/api/categories");
            setCategories(response.data?.categories);
          } catch (error) {
            console.error(error);
          }
        })();
      }, []);

    const handleCategoryClick = (category) => {
      changeCategory(category);
      navigate("/explore");
    }

    return (
        <div className='flex-column'>
            <h2 className='home-title'>Categories</h2>
            <div className='categories-section flex-row'>
            {
                categories.map((item) => (
                    <div className='category-card-container flex-column' key={item.id} onClick={() => handleCategoryClick(item.categoryName)}>
                    	<img src={item.imgUrl}></img>
                    	<div className='category-details'>
                    		<h3>{item.categoryName}</h3>
                    		<p>{item.description} </p>
                    	</div>
                    </div>
                ))
            }
            </div>
        </div>
    );
};

export default Home;