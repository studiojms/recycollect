import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Recycollect" />
        </header>
        <main>
          <h1>Your marketplace of waste collecting.</h1>
          <p>We help people find collection points efficiently</p>
          <Link to="/create-point">
            <span>
              <FiLogIn />
            </span>
            <strong>Register a Collection Point</strong>
          </Link>
        </main>
      </div>
    </div>
  );
}

export default Home;
