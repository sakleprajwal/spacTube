import axios from 'axios';
import { React, useState, useEffect } from 'react';
import './Home.css'

const Home = () => {
    const [categories, setCategories] = useState([])
    
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

    return (
        <div>
            <h2 className='home-title'>Categories</h2>
            <div className='categories-section flex-row'>
            {
                categories.map((item) => (
                    <div className='category-card-container flex-column' key={item.id}>
                    	<img src={item.imgUrl}></img>
                    	<div className='category-details'>
                    		<h3>{item.categoryName}</h3>
                    		<p>{item.description} </p>
                        <p>lorem23</p>
                    	</div>
                    </div>
                ))
            }
            </div>
        </div>
    );
};

export default Home;