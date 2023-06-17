import React from 'react';

import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles'; //Just from the name we can say that yseStyles is a hook so let's call it how we usually call a hook that is const classes = useStyles();
// import { useState } from 'react';

const Header = ({ onPlaceChanged, onload }) => {
    const classes = useStyles();
    // const [autocomplete, setAutocomplete] = useState(null);

    // const onload = (autoC) => setAutocomplete(autoC);

    // const onPlaceChanged = () => {
    //     const lat = autocomplete.getPlace().geometry.location.lat();
    //     const lng = autocomplete.getPlace().geometry.location.lng();

    //     setCoordinates({ lat, lng });
    // }

    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    Trip Tastic
                </Typography>

                <Box display="flex">
                    <Typography variant="h6" className={classes.title}>
                        Explore New Places
                    </Typography>

                    <Autocomplete onload={onload} onPlaceChanged={onPlaceChanged}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>

                            <InputBase placeholder="Search..." classes={{ root: classes.inputRoot, input: classes.inputInput }} />

                        </div>
                    </Autocomplete>

                </Box>

            </Toolbar>
        </AppBar>
    );
}

export default Header;