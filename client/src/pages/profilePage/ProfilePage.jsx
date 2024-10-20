import React, { useEffect } from 'react';
import List from '../../list/List';
import "./profilePage.scss";
import Chat from "../../chat/Chat.jsx";
import apiRequest from '../../lib/apiRequest';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from '../../context/AuthContext.jsx';

const ProfilePage = () => {

    const navigate = useNavigate();

    const { updateUser, currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (!currentUser) navigate("/login");
    }, [currentUser]);

    const handleLogout = async () => {
        try {
            await apiRequest.post("/auth/logout");
            updateUser(null);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }
    return (
        currentUser && <div className='profielPage'>
            <div className="details">
                <div className="wrapper">

                    <div className="title">
                        <h1>User Information</h1>
                        <Link to="/profile/update">
                            <button>Update Profile</button>
                        </Link>
                    </div>
                    <div className="info">
                        <span>
                            Avatar:
                            <img src={currentUser.avatar || "noavatar.jpg"} alt="" />
                        </span>
                        <span>Username: <b>{currentUser.username}</b></span>
                        <span>E-mail: <b>{currentUser.email}</b></span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                    <div className="title">
                        <h1>My List</h1>
                        <Link to="/add">
                            <button>Create New Post</button>
                        </Link>
                    </div>
                    <List />
                    <div className="title">
                        <h1>Saved List</h1>
                    </div>


                </div>
            </div>

            <div className="chatContainer">
                <div className="wrapper">
                    <Chat />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;