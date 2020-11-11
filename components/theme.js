import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFF',
    },
    secondary: {
      main: '#000',
    },
    error: {
      main: red.A400,
    },
    background: {
      // default: '#F5F5F5',
    },
  },
  // typography: {
  //   fontFamily: [
  //     'Expert Sans Light',
  //     'Roboto',
  //   ].join(','),
  // }
});
export default theme;
