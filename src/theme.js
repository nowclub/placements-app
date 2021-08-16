import { extendTheme } from "@chakra-ui/react";

import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "@fontsource/ibm-plex-mono/700.css";

import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/600.css";

const theme = extendTheme({
  fonts: {
    heading: "IBM Plex Mono",
    body: "Open Sans",
  },
});

export default theme;
