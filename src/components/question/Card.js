import React from "react";

import { Box, Text, Heading } from "@chakra-ui/react";

const QuestionCard = ({ index, question, children }) => (
  <Box p="4" bgColor="whiteAlpha.600" borderRadius="md">
    <Text
      fontWeight="semibold"
      textTransform="uppercase"
      fontSize="xs"
      color="gray.600"
      mb="1"
    >
      Question {index}
    </Text>

    <Heading as="h6" size="md" fontWeight="medium" lineHeight="normal">
      {question}
    </Heading>

    {children && <Box mt="2">{children}</Box>}
  </Box>
);

export default QuestionCard;
