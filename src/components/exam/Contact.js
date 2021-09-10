import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import React from "react";
import { useFormContext } from "react-hook-form";

const inputStyleProps = {
  variant: "filled",
  bgColor: "white",
  _focus: { bgColor: "white" },
  _hover: { bgColor: "white" },
  color: "gray.800",
};

function Contact() {
  const { register } = useFormContext();

  return (
    <>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input isRequired {...register("contact.name")} {...inputStyleProps} />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          isRequired
          {...register("contact.email")}
          {...inputStyleProps}
        ></Input>
      </FormControl>
      <FormControl>
        <FormLabel>Phone</FormLabel>
        <Input
          inputMode="tel"
          {...register("contact.phone")}
          {...inputStyleProps}
        ></Input>
      </FormControl>
    </>
  );
}

export default Contact;
