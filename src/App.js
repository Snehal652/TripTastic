// Most Important COomponent of entire Application

import React from 'react';
import { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
//This is for importing some of the things from material-ui to start creating our layout.First we use CSS BASELINE, this is a component from material ui that simply normalizes the styles so it's going to fix some paddings, margins and background colors immediately for us
// We also need a grid which will be coming from material-ui
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

import { getPlacesData, getWeatherData } from './api/triptasticAPI';

//Also before running this app, install the necessary dependencies - install it using npm install npm install @material-ui/core @material-ui/icons @material-ui/lab @react-google-maps/api axios google-map-react
// creating a functional App component
const App = () => {
    const [places, setPlaces] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([])

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});

    const [autocomplete, setAutocomplete] = useState(null);
    const [childClicked, setChildClicked] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        });
    }, []);

    useEffect(() => {
        const filteredPlaces = places.filter((place) => Number(place.rating) > rating);
        setFilteredPlaces(filteredPlaces);

    }, [rating]);

    useEffect(() => {
        if (bounds.sw && bounds.ne) {
            setIsLoading(true);

            getWeatherData(coordinates.lat, coordinates.lng)
                .then((data) => setWeatherData(data))

            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
                    setFilteredPlaces([]);
                    setRating('');
                    setIsLoading(false);
                });
        }
    }, [type, bounds]);

    const onLoad = (autoC) => setAutocomplete(autoC);

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();

        setCoordinates({ lat, lng });
    };

    return (
        <>
            <CssBaseline />
            <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}

                    />
                </Grid>
                <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default App;