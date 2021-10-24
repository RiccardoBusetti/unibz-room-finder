import React, { useEffect, useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from './SearchBar';
import { debounce } from '../utils/functions';
import useAppContext from '../hooks/useAppContext';
import 'react-day-picker/lib/style.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';

const useStyles = makeStyles((theme) => ({
    searchCard: {
        position: 'relative',
        borderRadius: 20,
        height: 'auto',
        '&:hover': {
            boxShadow: `0px 10px 25px -5px grey`,
        }
    },
    datePicker: {
        width: '100%'
    }
}));

export default function SearchCard() {
    const classes = useStyles();
    const appData = useAppContext();

    const [room, setRoom] = useState();
    const [selectedDay, setSelectedDay] = useState(new Date());

    const performSearch = () => {
        appData.checkAvailabilityFor(room, selectedDay);
    }


    useEffect(() => {
        if (room) {
            performSearch();
        }
    }, [selectedDay]);

    return (
        <Grid
            container
            direction="row"
            alignItems="center"
            spacing={2}
        >
            <Grid item xs={12} md={10}>
                <Paper
                    className={classes.searchCard}
                    variant="outlined"
                >
                    <SearchBar
                        performSearch={performSearch}
                        onSearching={(newRoom) => setRoom(newRoom)}
                        isLoading={appData.isLoadingAvailability}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} md={2}>
                <DayPickerInput className={classes.datePicker} value={selectedDay} onDayChange={day => setSelectedDay(day)} />
            </Grid>
        </Grid>
    );
}