import React  from 'react';
import {  Route } from "react-router-dom";
import Home from "./Home";
import Pizza from "./Pizza";


const App = () => {


  

  return (
    <div>

        <Route path="/" exact component={Home} />
        <Route path="/Pizza" component={Pizza} />
  
    </div>
  );
};

export default App;
