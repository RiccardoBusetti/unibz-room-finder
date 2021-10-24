import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

export const themedBorderRadius = 20;

export default responsiveFontSizes(
    createTheme({
        palette: {
            primary: {
                main: '#007be4',
            },
            secondary: {
                main: '#007be4',
                light: '#007be4',
            }
        }
    })
);
