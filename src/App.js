import { Grid, makeStyles, MuiThemeProvider, Typography } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import './App.css';
import AvailabilityResults from './components/AvailabilityResults';
import SearchCard from './components/SearchCard';
import AppContext from './contexts/AppContext';
import useData from './hooks/useData';
import theme from './theming/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    margin: theme.spacing(2)
  },
  unibz: {
    color: '#007be4'
  }
}));

function App() {
  const data = useData();

  return (
    <SnackbarProvider maxSnack={1}>
      <AppContext.Provider value={data}>
        <MuiThemeProvider theme={theme}>
          <Home />
        </MuiThemeProvider>
      </AppContext.Provider>
    </SnackbarProvider>
  );
}

function Home() {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} md={6}>
        <Grid
          container
          direction="row"
          spacing={2}
        >
          <Grid item xs={12}>
            <Typography variant="h3"><b className={classes.unibz}>unibz</b> room finder</Typography>
            <Typography variant="subtitle1">
              Made with ❤️ by <a href="https://riccardobusetti.xyz" target="_blank" rel="noreferrer">Riccardo Busetti</a>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <SearchCard />
          </Grid>
          <Grid item xs={12}>
            <AvailabilityResults />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default App;
