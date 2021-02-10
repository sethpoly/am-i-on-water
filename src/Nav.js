import React from 'react';
import './Nav.css';
import search_icon from './Images/search-icon.png';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div>
      <div className="nav-bar">
        <div className="logo-image">
          {/* <Link to="/">
            <a>Water or Land</a>
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default Nav;