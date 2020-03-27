import React from 'react';
import { Link } from "react-router-dom";

const Home = props => {
  return (
    <div className="pizza-button"><Link to="/Pizza">Pizza</Link></div>
  );
}

export default Home;
