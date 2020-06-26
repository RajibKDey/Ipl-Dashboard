import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const lightTheme = createMuiTheme({
  root: {
    '&$selected': {
      backgroundColor: 'blue',
    },
    button :{
      '&$hover' : {
        backgroundColor : '#4f5f76'
      }
    },
  },
  palette: {
    white: {
      main : '#fff'
    },
    highlightedBlue : {
      main : '#5B6F8A'
    },
    primary: {  
        light: '#4f91cd',
        main: '#19388a',
        dark: '#313d4b',
    },
    secondary: {
      light: '#63ddac',
      main: 'rgba(6, 42, 99, 0.87)',
      dark: '#2a956a'
    },
    almostBlack: {
      light : '#323C47',
      main : '#d5d5dc',
      dark : '#171725'
    },
    subText: {
      main : '#6A6A66',
    }
    // success: {
    //   light: '#9bcf63',
    //   main: '#82c43c',
    //   dark: '#5b892a'
    // },
    // error: {
    //   light: '#fc7b7b',
    //   main: '#fc5a5a',
    //   dark: '#b03e3e'
    // },
    // warning: {
    //   light: '#ffab6e',
    //   main: '#ff974a',
    //   dark: '#b26933'
    // },
    // info: {
    //   light: '#73c3ff',
    //   main: '#50b5ff',
    //   dark: '#387eb2'
    // },
    
    // background: {
    //   paper: '#fff',
    //   default: '#fafafb'
    // },
    // text: {
    //   primary: '#171725',
    //   secondary: '#92929d',
    //   disabled: '#e2e2ea',
    //   hint: '#e2e2ea'
    // }
  },
  // status: {
  //   danger: 'orange',
  // },
  typography: {
    fontFamily: [
      'Roboto',
      "Raleway",
      'Poppins',
      "sans-serif",
    ].join(','),
  },
});



export default {
    light:responsiveFontSizes(lightTheme)
};