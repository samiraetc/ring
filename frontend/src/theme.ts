// @ts-ignore
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#e3f9f5',
      100: '#c1eedd',
      200: '#9fe3c5',
      300: '#7dd8ad',
      400: '#5bcd95',
      500: '#3bc37d',
      600: '#2e9b62',
      700: '#217347',
      800: '#144b2c',
      900: '#072311',
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
});

export default theme; 