import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

function Part({ title, instructions, actions, children }) {
  return (
    <Box as="section" my="8" p="4" borderWidth="2px" borderColor="gray.800">
      <Box>
        <Heading>{title}</Heading>
        <Text mt="3">{instructions}</Text>
      </Box>

      <VStack spacing="3" mt="8" alignItems="stretch">
        {children}
      </VStack>

      <Box mt="8">{actions}</Box>
    </Box>
  );
}

export default Part;
