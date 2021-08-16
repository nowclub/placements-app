import React, { forwardRef, useMemo } from "react";
import {
  Box,
  FormControl,
  RadioGroup,
  Wrap,
  Radio,
  FormLabel,
  FormErrorMessage,
  Stack,
} from "@chakra-ui/react";

import Card from "./Card";

const WrittenQuestion = forwardRef(
  (
    { index, question, choices, isDisabled, isInvalid, value, onChange },
    ref
  ) => {
    const [left, right] = useMemo(() => question.split("_"), [question]);
    return (
      <Card
        index={index + 1}
        question={
          <>
            {left}
            <Box
              as="span"
              textDecoration="underline"
              textDecorationColor="orange.500"
              textDecorationThickness="3px"
              textUnderlineOffset="3px"
            >
              {value ? value : <>&#x2800;&#x2800;</>}
            </Box>
            {right}
          </>
        }
      >
        {!isDisabled && (
          <FormControl isInvalid={isInvalid}>
            <FormLabel>Choose one answer:</FormLabel>
            <RadioGroup ref={ref} value={value} onChange={onChange}>
              <Stack direction="column" spacing={4}>
                {choices.map((choice) => (
                  <Radio key={choice} value={choice}>
                    {choice}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>

            <FormErrorMessage>Please select an option</FormErrorMessage>
          </FormControl>
        )}
      </Card>
    );
  }
);

export default WrittenQuestion;
