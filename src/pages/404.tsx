import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <React.Fragment>
      <h1>Page not found!</h1>
      <Link to="identify">Back to Home page</Link>
    </React.Fragment>
  );
};

export default NotFound;
