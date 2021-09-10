import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import WrittenQuestion from "../question/Written";

function Written({ questions }) {
  const { control } = useFormContext();

  return (
    <>
      {questions.map((data, index) => (
        <Controller
          key={data.question}
          control={control}
          name={`answers.${data.level}.${index}`}
          rules={{ required: true }}
          render={({ field, fieldState: { invalid } }) => (
            <WrittenQuestion
              index={index}
              question={data.question}
              choices={data.choices}
              isInvalid={invalid}
              {...field}
            ></WrittenQuestion>
          )}
        />
      ))}
    </>
  );
}

export default Written;
