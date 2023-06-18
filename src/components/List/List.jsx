import React from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails';

import useStyles from './styles.js';
import { useState, useEffect, createRef } from 'react';

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
    const classes = useStyles();

    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places]);
