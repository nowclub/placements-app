import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import OralQuestion from "../question/Oral";

function Oral({ questions }) {
  const { control } = useFormContext();

  return (
    <>
      {questions.map(({ question }, index) => (
        <Controller
          key={index}
          control={control}
          name={`oral_questions.${index}.answer`}
          rules={{ required: true }}
          render={({ field: { value, onChange }, fieldState: { invalid } }) => (
            <OralQuestion
              index={index + 1}
              question={question}
              value={value}
              onChange={onChange}
              isInvalid={invalid}
            ></OralQuestion>
          )}
        />
      ))}
    </>
  );
}

export default Oral;
