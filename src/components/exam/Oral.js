import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import QuestionCard from "../question/Card";
import OralQuestion from "../question/Oral";
import Part from "./Part";

function Oral({ questions }) {
  const { control } = useFormContext();

  return (
    <Part
      title="Oral Questions"
      instructions={`
            Excepteur occaecat culpa amet reprehenderit cillum ipsum aliqua
            mollit id cillum et eiusmod laboris quis. Velit est ut adipisicing
            do. Dolor do excepteur Lorem sint aliqua tempor elit do velit. Duis
            nulla est laborum cupidatat ad velit irure sit. Aliqua anim fugiat
            exercitation veniam et dolor laboris excepteur.
        `}
    >
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
    </Part>
  );
}

export default Oral;
