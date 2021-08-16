import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./src/theme";

export function wrapRootElement({ element }) {
  return <ChakraProvider theme={theme}>{element}</ChakraProvider>;
}
