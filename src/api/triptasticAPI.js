import axios from "axios"; //axios is library that's going to help us make our calls



export const getPlacesData = async (type, sw, ne) => {   //This is a function that's going to make that api call
    try {
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY,
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            },
        });

        return data;

    } catch (error) {
        console.log(error);
    }
};

export const getWeatherData = async (lat, lng) => {
    try {
      if (lat && lng) {
        const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
          params: { lat, lon: lng },
          headers: {
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_WEATHER_API_KEY,
            'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          },
        });
  
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };