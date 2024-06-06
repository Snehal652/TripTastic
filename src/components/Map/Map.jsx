import React from 'react';
import GoogleMapReact from 'google-map-react'; //Google Map React does a great job giving you access to the Google Maps API and exposing JavaScript functionality and presentation.
import { Paper, Typography, useMediaQuery } from '@material-ui/core'; //Material UI is an open-source React component library that implements Google's Material Design. It includes a comprehensive collection of prebuilt components that are ready for use in production right out of the box.
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles.js';
import mapStyles from '../../mapStyles';

//This is functional component
const Map = ({ setCoords, setBounds, coords, places, setChildClicked, weatherData }) => {  //The map will be recieving different props
    const classes = useStyles(); // Hook to change styles. The useStyles function is a React hook that can be used to generate CSS stylesheets and inject to custom components. It returns an object containing: classes 
    const isMobile = useMediaQuery('(min-width:600px)'); // this means that variable isMobile is set to false if width of device is larger than 600px 

    return ( //This contains JSX
        <div className={classes.mapContainer}>
            <GoogleMapReact //Most important Component and we will pass some props to it
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }} //API key secured by enviornment variable. We get this key from console.cloud.google.com
                defaultCenter={coords} // This will show us the center of the map
                center={coords} // This will show the current center of our map
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
                onChange={(e) => {  //The onChange event in React detects when the value of an input element changes.This is initiated when we change the coordinates on map.How will we get to know that whether the coordinate has changed or not? GoogleMapReact will be doing that for us. 
                    setCoords({ lat: e.center.lat, lng: e.center.lng }); // We will call a callback function which will have event e inside of it. 
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw }) //Inside of it we will call setcooridnates and inside of it we are going to set it to an object which has lat and lng property.
                }}   // setbounds is also an object.For bounds we will use northeast and southwest. THis will set our top right and bottom left corner.
                onChildClick={(child) => setChildClicked(child)}  // This is initiated when you click on a restaurant on a map. setbounds will have two properties ne and sw.
            //Onchildclick is an event listener
            >

                {places.length && places.map((place, i) => ( //This is used to pins on the map. In ReactJs, the maps are used for traversing or displaying the list of similar objects of a component.
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)} //Number is used to convert the strings into number
                        lng={Number(place.longitude)}
                        key={i}

                    >

                        { // If we are on a mobile device then this is called
                            !isMobile ?
                                <LocationOnOutlinedIcon color="primary" fontSize="large" />
                                //If it is not a mobile then call this
                                : ( //Paper is a div with a background.  It is similar to the Card component, i.e. we can use it as a background for other components.Typography is a Material-UI component used to standardize the text and its related CSS properties without worrying about browser compatibility issues
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography className={classes.Typography} variant="subtitle2" gutterBottom>
                                            {place.name}
                                        </Typography>
                                        <img
                                            className={classes.pointer}
                                            src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg '}
                                        />
                                        <Rating name="read-only" size='small' value={Number(place.rating)} readOnly />
                                    </Paper>
                                )
                        }
                    </div>
                ))}
                {weatherData?.list?.length && weatherData.list.map((data, i) => (
                    <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                        <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" />
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    );
};
export default Map; 