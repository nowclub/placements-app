import { Box, Heading, Text, VStack, Button } from "@chakra-ui/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

function Part({ title, instructions, onSubmit, children }) {
  const methods = useForm();
  const { handleSubmit } = methods;
  return (
    <FormProvider {...methods}>
      <Box as="form" onSubmit={handleSubmit(onSubmit)} my="8">
        <Box>
          <Heading>{title}</Heading>
          <Text mt="3">{instructions}</Text>
        </Box>

        <VStack spacing="3" mt="8" alignItems="stretch">
          {children}
        </VStack>

        <Button type="submit" isFullWidth mt="8" colorScheme="blue" size="lg">
          Continue
        </Button>
      </Box>
    </FormProvider>
  );
}

export default Part;
