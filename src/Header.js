import React from 'react';
import './Header.css';
import Nav from './Nav';
import {Link} from 'react-router-dom';

function HomeDefault() {
  return (
    <div>
      <div className="home-header-container">
          <h1 className="header-title">Are you on <span 
              style={{fontWeight:'700'}}> water?</span> </h1>
          <h2 className="subheader-title">
            A helpful tool to distinguish land from water.</h2>
      </div>
    </div>
  );
}

export default HomeDefault;
