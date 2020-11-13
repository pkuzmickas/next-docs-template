import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFF',
    },
    secondary: {
      main: '#0076B6',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#FFF',
    },
  },
  typography: {
    // fontFamily: [
    //   'Expert Sans Light',
    //   'Roboto',
    // ].join(','),
    fontSize:16
  }
});
export default theme;
