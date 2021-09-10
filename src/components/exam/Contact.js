import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import React from "react";
import { useFormContext } from "react-hook-form";

function Contact() {
  const { register } = useFormContext();

  return (
    <>
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
    </>
  );
}

export default Contact;
