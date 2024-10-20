import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext.jsx';
import SearchBar from '../../searchBar/SearchBar';
import "./HomePage.scss";

const HomePage = () => {

    const { currentUser } = useContext(AuthContext);

    console.log(currentUser);
    return (
        <div className='HomePage'>
            <div className="textContainer">
                <div className="wrapper">
                    <h1 className='title'>Find Real Estate & Get Your Dream Place</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis velit necessitatibus ducimus culpa pariatur quos consequuntur placeat, magnam reprehenderit iusto at aut, nemo animi ipsa corrupti. Natus esse et quibusdam eaque ipsum sapiente facilis?</p>
                    <SearchBar />
                    <div className="boxes">
                        <div className="box">
                            <h1>16+</h1>
                            <div>Years Of Experience</div>
                        </div>
                        <div className="box">
                            <h1>200</h1>
                            <div>Award Gained</div>
                        </div>
                        <div className="box">
                            <h1>2000+</h1>
                            <div>Property Ready</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="imgContainer">
                <img src="/bg.png" alt="" />
            </div>
        </div>
    )
}

export default HomePage;