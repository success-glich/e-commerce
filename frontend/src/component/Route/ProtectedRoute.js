import React from "react";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated, user } = use;
  return <div>ProtectedRoute</div>;
};

export default ProtectedRoute;
