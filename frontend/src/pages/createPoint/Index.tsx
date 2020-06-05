import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';

import './styles.css';
import logo from '../../assets/logo.svg';

function CreatePoint() {
  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Recycollect" />
        <Link to="/">
          <FiArrowLeft />
          Back to Home
        </Link>
      </header>
      <form>
        <h1>Collection Point Register</h1>
        <fieldset>
          <legend>
            <h2>Data</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Entity Name</label>
            <input type="text" name="name" id="name" />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email" />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="text" name="whatsapp" id="whatsapp" />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Address</h2>
            <span>Select the address on the map</span>
          </legend>

          <Map center={[-23.5736498, -46.6714875]} zoom={12.2}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-23.5736498, -46.6714875]} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="state">State</label>
              <select name="state" id="state">
                <option value="0">Select a State...</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">City</label>
              <select name="city" id="city">
                <option value="0">Select a City...</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Items</h2>
            <span>Select one or more items below</span>
          </legend>

          <ul className="items-grid">
            <li>
              <img src="http://localhost:3030/uploads/oil.svg" alt="Oil" />
              <span>Oil</span>
            </li>
            <li>
              <img src="http://localhost:3030/uploads/oil.svg" alt="Oil" />
              <span>Oil</span>
            </li>
            <li>
              <img src="http://localhost:3030/uploads/oil.svg" alt="Oil" />
              <span>Oil</span>
            </li>
            <li>
              <img src="http://localhost:3030/uploads/oil.svg" alt="Oil" />
              <span>Oil</span>
            </li>
            <li>
              <img src="http://localhost:3030/uploads/oil.svg" alt="Oil" />
              <span>Oil</span>
            </li>
            <li>
              <img src="http://localhost:3030/uploads/oil.svg" alt="Oil" />
              <span>Oil</span>
            </li>
          </ul>
        </fieldset>

        <button type="submit">Register Collection Point</button>
      </form>
    </div>
  );
}

export default CreatePoint;
