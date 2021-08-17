import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import React, { useState } from "react";
import VoiceRecorder from "../VoiceRecorder";
import Card from "./Card";

const OralQuestion = ({ index, question }) => {
  const [media, setMedia] = useState(null);

  return (
    <Card index={index + 1} question={question}>
      <FormControl>
        <FormLabel>Choose record your answer:</FormLabel>
        <VoiceRecorder value={media} onChange={(media) => setMedia(media)} />

        <FormErrorMessage>Please select an option</FormErrorMessage>
      </FormControl>
    </Card>
  );
};

export default OralQuestion;
