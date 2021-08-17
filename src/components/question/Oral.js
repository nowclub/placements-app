import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import VoiceRecorder from "../VoiceRecorder";
import Card from "./Card";

const OralQuestion = ({ index, question, value, onChange, isInvalid }) => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadMedia = useCallback(async (data) => {
    const { uploadUrl, url } = await fetch("/api/upload-recording", {
      method: "POST",
    }).then((res) => res.json());

    await fetch(uploadUrl, { method: "PUT", body: data });

    onChange(url);
  }, []);

  return (
    <Card index={index + 1} question={question}>
      <FormControl isInvalid={isInvalid}>
        <FormLabel>Choose record your answer:</FormLabel>
        <VoiceRecorder
          isLoading={isLoading}
          value={value}
          onChange={(data) =>
            Promise.resolve()
              .then(() => setIsLoading(true))
              .then(async () => await uploadMedia(data))
              .finally(() => setIsLoading(false))
          }
        />

        <FormErrorMessage>Please record your answer</FormErrorMessage>
      </FormControl>
    </Card>
  );
};

export default OralQuestion;
