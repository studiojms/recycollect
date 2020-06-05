import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { useToasts } from 'react-toast-notifications';

import './styles.css';
import logo from '../../assets/logo.svg';
import api from '../../services/api';
import ibgeApi from '../../services/ibgeApi';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface IBGEAcronymResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

function CreatePoint(): JSX.Element {
  const history = useHistory();
  const { addToast } = useToasts();

  const [items, setItems] = useState<Item[]>([]);
  const [stateAcronyms, setStateAcronyms] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });

  const [initialMapPosition, setInitialMapPosition] = useState<[number, number]>([0, 0]);

  const [selectedState, setSelectedState] = useState<string>('0');
  const [selectedCity, setSelectedCity] = useState<string>('0');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedMapPosition, setSelectedMapPosition] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    (async () => {
      const resp = await api.get('items');
      setItems(resp.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const resp = await ibgeApi.get<IBGEAcronymResponse[]>('estados');
      const stateAcronyms = resp.data.map((val: IBGEAcronymResponse) => val.sigla);
      setStateAcronyms(stateAcronyms);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const resp = await ibgeApi.get<IBGEAcronymResponse[]>('estados');
      const stateAcronyms = resp.data.map((val: IBGEAcronymResponse) => val.sigla).sort();
      setStateAcronyms(stateAcronyms);
    })();
  }, []);

  useEffect(() => {
    if ('navigator' in window) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setInitialMapPosition([latitude, longitude]);
        },
        (err) => {
          setInitialMapPosition([-23.5736498, -46.6714875]);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (selectedState !== '0') {
      (async () => {
        const resp = await ibgeApi.get<IBGECityResponse[]>(`estados/${selectedState}/municipios`);
        const cities = resp.data.map((val: IBGECityResponse) => val.nome).sort();
        setCities(cities);
      })();
    }
  }, [selectedState]);

  function handleSelectState(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedState(e.target.value);
  }

  function handleSelectCity(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedCity(e.target.value);
  }

  function handleMapClick(e: LeafletMouseEvent) {
    const { lat, lng } = e.latlng;
    setSelectedMapPosition([lat, lng]);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSelectItem(itemId: number) {
    const selected = selectedItems.findIndex((item) => item === itemId);

    if (selected >= 0) {
      setSelectedItems(selectedItems.filter((item) => item !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const { name, email, whatsapp } = formData;
    const state = selectedState;
    const city = selectedCity;
    const [latitude, longitude] = selectedMapPosition;
    const items = selectedItems;

    const data = {
      name,
      email,
      whatsapp,
      state,
      city,
      latitude,
      longitude,
      items,
    };

    try {
      await api.post('points', data);

      addToast('Point Created Successfully', { appearance: 'success' });
      history.push('/');
    } catch (err) {
      console.error(err);
      addToast(err.message, { appearance: 'error' });
    }
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Recycollect" />
        <Link to="/">
          <FiArrowLeft />
          Back to Home
        </Link>
      </header>
      <form onSubmit={handleSubmit}>
        <h1>Collection Point Register</h1>
        <fieldset>
          <legend>
            <h2>Data</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Entity Name</label>
            <input type="text" name="name" id="name" onChange={handleInputChange} />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email" onChange={handleInputChange} />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange} />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Address</h2>
            <span>Select the address on the map</span>
          </legend>

          <Map center={initialMapPosition} zoom={12.2} onClick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedMapPosition} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="state">State</label>
              <select name="state" id="state" value={selectedState} onChange={handleSelectState}>
                <option value="0">Select a State...</option>
                {stateAcronyms.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">City</label>
              <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
                <option value="0">Select a City...</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
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
            {items.map((item) => (
              <li
                key={item.id}
                className={selectedItems.includes(item.id) ? 'selected' : ''}
                onClick={() => handleSelectItem(item.id)}
              >
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Register Collection Point</button>
      </form>
    </div>
  );
}

export default CreatePoint;
