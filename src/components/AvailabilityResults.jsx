import { Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import useAppContext from '../hooks/useAppContext';

const useStyles = makeStyles((theme) => ({
    resultsContainer: {
        borderRadius: 20,
        padding: theme.spacing(2)
    },
    resultsContainerEmpty: {
        borderRadius: 20,
        padding: theme.spacing(2),
        color: 'white',
        backgroundImage: 'url(https://i.pinimg.com/originals/86/74/a9/8674a918f3765e5ab9f1191ad5811713.gif)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '256px'
    },
    resultsContainerFull: {
        borderRadius: 20,
        padding: theme.spacing(2),
        color: 'white',
        backgroundImage: 'url(https://c.tenor.com/djA9WbTjKOEAAAAC/angry-bird.gif)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '256px'
    },
    divider: {
        marginTop: theme.spacing(2),
    }
}));

function AvailabilityResults() {
    const classes = useStyles();
    const appData = useAppContext();

    const { enqueueSnackbar } = useSnackbar();

    if (appData.error) {
        enqueueSnackbar(appData.error, { variant: "error" });
        return <></>;
    }

    const availability = appData.availability;

    const isDayEmpty = availability && availability.isDayEmpty;
    const isDayFull = availability && !availability.isDayEmpty && availability.availabilities.length === 0;

    var pageStyle = classes.resultsContainer;
    if (isDayEmpty) {
        pageStyle = classes.resultsContainerEmpty;
    } else if (isDayFull) {
        pageStyle = classes.resultsContainerFull;
    }

    var description = "The following timeslots are available";
    if (isDayEmpty) {
        description = "The room is empty or does not exist 🤩";
    } else if (isDayFull) {
        description = "The room is full for the day 😭";
    }

    return (
        <>
            {
                availability &&
                <Paper
                    className={pageStyle}
                    variant="outlined"
                >
                    <Grid
                        className={classes.root}
                        container
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            <Typography variant="h4"><b>{availability.room}</b></Typography>
                            <Typography variant="subtitle1">{description}</Typography>
                        </Grid>
                        {
                            !isDayEmpty &&
                            !isDayFull &&
                            availability.availabilities.map(((innerAvailability, index) => <Grid key={index} item xs={12}>
                                <Availability availability={innerAvailability} />
                                {index < availability.availabilities.length - 1 && <Divider className={classes.divider} />}
                            </Grid>))
                        }
                        <Grid item xs={12}>
                            <Typography variant="subtitle2">
                                <i>Please note that it is your responsibility if you decide to go into a room without permission. I do not take any responsibility in case any problems will arise. This webpage is not affiliated with unibz and wants to help students organize themselves.</i>
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            }
        </>

    )
}

function Availability({ availability }) {
    return (
        <Grid
            container
        >
            <Grid item xs={12}>
                <Typography variant="subtitle2">{availability.day}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6"><b>{availability.from} - {availability.to}</b></Typography>
            </Grid>
        </Grid>
    );
}

export default AvailabilityResults;