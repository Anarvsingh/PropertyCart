import React, { useContext, useEffect } from 'react';
import "./Layout.scss";
import Navbar from '../../Navbar/Navbar';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

function RequireAuth() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return <Navigate to="/login" />;
  else {
    return (
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    );
  }
}

export { Layout, RequireAuth };

export default { Layout, RequireAuth };
