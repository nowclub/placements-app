import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { Textarea } from "@chakra-ui/textarea";
import React from "react";
import { useFormContext } from "react-hook-form";
import Part from "./Part";

function Contact() {
  const { register } = useFormContext();

  return (
    <Part
      title="Personal Info"
      instructions={`
            Excepteur occaecat culpa amet reprehenderit cillum ipsum aliqua
            mollit id cillum et eiusmod laboris quis. Velit est ut adipisicing
            do. Dolor do excepteur Lorem sint aliqua tempor elit do velit. Duis
            nulla est laborum cupidatat ad velit irure sit. Aliqua anim fugiat
            exercitation veniam et dolor laboris excepteur.
        `}
    >
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input isRequired {...register("contact.name")} />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type="email" isRequired {...register("contact.email")}></Input>
      </FormControl>
      <FormControl>
        <FormLabel>Phone</FormLabel>
        <Input inputMode="tel" {...register("contact.phone")}></Input>
      </FormControl>

      <FormControl>
        <FormLabel>What do you think is your current level?</FormLabel>
        <Select
          placeholder="Select a level"
          isRequired
          {...register("contact.expected_level")}
        >
          <option value="A1">A1 (total beginner)</option>
          <option value="A2">A2 (beginner)</option>
          <option value="B1">B1 (basic knowledge)</option>
          <option value="B2">B2 (intermediate)</option>
          <option value="C1">C1 (advanced)</option>
          <option value="C2">C2 (fluent)</option>
        </Select>
        <FormHelperText></FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel>Tell us a bit about yourself</FormLabel>
        <Textarea
          rows="4"
          placeholder="Write something here"
          {...register("contact.about_me")}
        ></Textarea>
        <FormHelperText>
          Tell us about your current knowledge on this language and your goals
        </FormHelperText>
      </FormControl>
    </Part>
  );
}

export default Contact;
