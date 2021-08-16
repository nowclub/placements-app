import React, { forwardRef, useMemo } from "react";
import {
  Box,
  Button,
  Icon,
  FormControl,
  RadioGroup,
  Wrap,
  Radio,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

import { BiMicrophone as RecordIcon } from "react-icons/bi";

import Card from "./Card";

const OralQuestion = forwardRef(({ index, question }, ref) => {
  return (
    <Card index={index + 1} question={question}>
      <FormControl>
        <FormLabel>Choose record your answer:</FormLabel>
        <Button
          ref={ref}
          colorScheme="purple"
          leftIcon={<Icon as={RecordIcon} />}
        >
          Record
        </Button>

        <FormErrorMessage>Please select an option</FormErrorMessage>
      </FormControl>
    </Card>
  );
});

export default OralQuestion;
