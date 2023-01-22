import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import bgimg from './mountains.jpeg';

const thm = createTheme({
  palette: {
    primary: {
      main: '#E2E4E3',
      contrastText: '#000000',
    },
    secondary: {
      main: '#866EE1',
      contrastText: '#E2E4E3',
    },
    background: {
      default: '#E2E4E3',
      paper: '#E2E4E3',
    },
    text: {
      primary: '#E2E4E3',
      secondary: '#000000',
    },
    input: {
      color: '#000000'
    },
  },
  typography: {
    fontFamily: 'Nunito',
    button: {
      textTransform: 'none',
    },
  },
  overrides: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInput-underline:after': {
            borderBottomColor: '#866EE1',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#866EE1',
            },
            '&:hover fieldset': {
              borderColor: '#866EE1',
            }
          },
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: '#866EE1',
          },
          '& .MuiInputLabel-root.Mui-disabled': {
            color: '#866EE1',
          },
        }
      }
    },
  },
});
const theme = responsiveFontSizes(thm);

export default theme;
