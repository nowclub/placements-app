import React, { useEffect } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import { Button } from "@chakra-ui/react";

import WrittenQuestion from "../question/Written";
import Part from "./Part";

function Written({ questions }) {
  const { control } = useFormContext();

  const { fields, append } = useFieldArray({
    control,
    name: `written_questions`,
  });

  useEffect(() => append(questions), [questions]);

  return (
    <Part
      title="Written Questions"
      instructions={`
            Excepteur occaecat culpa amet reprehenderit cillum ipsum aliqua
            mollit id cillum et eiusmod laboris quis. Velit est ut adipisicing
            do. Dolor do excepteur Lorem sint aliqua tempor elit do velit. Duis
            nulla est laborum cupidatat ad velit irure sit. Aliqua anim fugiat
            exercitation veniam et dolor laboris excepteur.
        `}
      actions={
        <Button isFullWidth colorScheme="blue">
          Next
        </Button>
      }
    >
      {fields.map((data, index) => (
        <Controller
          key={index}
          control={control}
          name={`written_questions.${index}.answer`}
          rules={{ required: true }}
          render={({ field }) => (
            <WrittenQuestion
              index={index}
              question={data.question}
              choices={data.choices}
              {...field}
            ></WrittenQuestion>
          )}
        />
      ))}
    </Part>
  );
}

export default Written;
