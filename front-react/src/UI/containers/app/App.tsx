import React from 'react';
import logo from '../../assests/icons/weSkiIcon.png';
import './App.css';

import SearchBarComponent from '../../common/components/SearchBar/SearchBar';
import HotelList from "../hotelList/HotelList";


function App() {
    const [hotels, setHotels] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    return (
        <div className="container">
            <div className="header">
                <img src={logo} className="weSkilogo" alt="logo"/>
                <SearchBarComponent setLoading={setLoading} setHotels={setHotels}/>
            </div>

            {loading ? <div>Loading...</div> : <HotelList hotels={hotels}/>}

        </div>
    );
}

export default App;
