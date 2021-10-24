import { CircularProgress, InputBase } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SearchRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    inputRoot: {
        color: 'inherit',
        fontSize: 18,
        width: '100%',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1),
        paddingLeft: `calc(1em + ${theme.spacing(1.5)}px)`,
        width: '100%',
    },
    search: {
        position: 'relative',
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    searchIconContainer: {
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingIndicatorContainer: {
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchIcon: {
        color: "grey",
    },
}));

export default function SearchBar({ performSearch, onSearching, isLoading }) {
    const classes = useStyles();

    return (
        <div className={classes.search}>
            <div className={classes.searchIconContainer}>
                {isLoading ? (
                    <CircularProgress
                        variant="indeterminate"
                        disableShrink
                        color="secondary"
                        size={20}
                        thickness={4}
                    />
                ) : (
                    <SearchRounded className={classes.searchIcon} />
                )}
            </div>
            <InputBase
                placeholder="Check availability by room name"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(event) => onSearching(event.target.value)}
                onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                        performSearch();
                        event.preventDefault();
                        document.activeElement.blur();
                    }
                }}
            />
        </div>
    );
}