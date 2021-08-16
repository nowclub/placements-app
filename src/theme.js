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
  components: {
    Button: {
      baseStyle: {
        borderRadius: "none",
      },
    },
    Input: {
      sizes: {
        xs: {
          field: { borderRadius: "none" },
          addon: { borderRadius: "none" },
        },
        sm: {
          field: { borderRadius: "none" },
          addon: { borderRadius: "none" },
        },
        md: {
          field: { borderRadius: "none" },
          addon: { borderRadius: "none" },
        },
        lg: {
          field: { borderRadius: "none" },
          addon: { borderRadius: "none" },
        },
      },
    },
    Select: {
      sizes: {
        xs: {
          field: { borderRadius: "none" },
          addon: { borderRadius: "none" },
        },
        sm: {
          field: { borderRadius: "none" },
          addon: { borderRadius: "none" },
        },
        md: {
          field: { borderRadius: "none" },
          addon: { borderRadius: "none" },
        },
        lg: {
          field: { borderRadius: "none" },
          addon: { borderRadius: "none" },
        },
      },
    },
    Textarea: {
      sizes: {
        xs: { borderRadius: "none" },
        sm: { borderRadius: "none" },
        md: { borderRadius: "none" },
        lg: { borderRadius: "none" },
      },
    },
  },
});

export default theme;
