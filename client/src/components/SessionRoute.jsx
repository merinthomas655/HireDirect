import React from 'react';
import { Navigate } from 'react-router-dom';

const SessionRoute = ({ element }) => {
  const isAuthenticated = () => {
    const user = sessionStorage.getItem('usersession');
    return !!user;
  };

  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default SessionRoute;
