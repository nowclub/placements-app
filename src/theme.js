import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: {
    50: "#FFFFFF",
    100: "#FAF4F3",
    200: "#EAD2D0",
    300: "#DAB0AD",
    400: "#CB8F89",
    500: "#BB6D66",
    600: "#A55149",
    700: "#813F3A",
    800: "#5E2E2A",
    900: "#3B1D1A",
  },
  secondary: {
    50: "#FFFFFF",
    100: "#F4F5F7",
    200: "#D7D9E1",
    300: "#BABDCB",
    400: "#9DA2B5",
    500: "#80869F",
    600: "#666C86",
    700: "#505569",
    800: "#3A3D4C",
    900: "#24262F",
  },
  accent: {
    50: "#FFFFFF",
    100: "#FFFFFF",
    200: "#FFFFFF",
    300: "#FDFDFD",
    400: "#EFEFF2",
    500: "#E1E1E6",
    600: "#D3D3DA",
    700: "#C5C5CF",
    800: "#B7B7C3",
    900: "#A9A9B8",
  },
};

const theme = extendTheme({
  colors,
  fonts: {
    heading: `"brandon-grotesque", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    body: `"brandon-grotesque", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    mono: `SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`,
  },
  styles: {
    global: {
      body: {
        backgroundColor: "accent.500",
        fontSize: "17px",
      },
    },
  },
  components: {
    Input: {
      defaultProps: {
        variant: "filled",
      },
    },
  },
});

export default theme;
