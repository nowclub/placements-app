import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";

import { Button, Input } from "@chakra-ui/react";

import WrittenQuestion from "../question/Written";
import Part from "./Part";

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

function Written({ questions }) {
  const { control, register } = useFormContext();

  const { fields, append } = useFieldArray({
    control,
    name: `written_questions`,
  });

  const answers = useWatch({ control, name: "written_questions" });

  const [done, setDone] = useState(false);
  const [level, setLevel] = useState(0);

  const questionsByLevel = useMemo(
    () =>
      LEVELS.map((currentLevel) =>
        questions.filter(({ level }) => currentLevel === level)
      ),
    [questions]
  );

  useEffect(() => append(questionsByLevel[0]), []);

  const handleNextLevel = () => {
    if (level + 1 === LEVELS.length) return;

    const levelAnswers = answers.filter(
      ({ level: questionLevel }) => LEVELS[level] === questionLevel
    );

    if (levelAnswers.some(({ answer }) => answer === undefined)) {
      return;
    }

    if (levelAnswers.length !== 0) {
      const correctAnswers = levelAnswers.filter(
        ({ answer, correct }) => answer === correct
      );

      const score = correctAnswers.length / levelAnswers.length;

      if (score > 0.7) {
        append(questionsByLevel[level + 1]);
        setLevel(level + 1);
      } else {
        setDone(true);
      }
    } else {
      append(questionsByLevel[level + 1]);
      setLevel(level + 1);
    }
  };

  return (
    <Part
      title={`Written Questions`}
      instructions={`
            Excepteur occaecat culpa amet reprehenderit cillum ipsum aliqua
            mollit id cillum et eiusmod laboris quis. Velit est ut adipisicing
            do. Dolor do excepteur Lorem sint aliqua tempor elit do velit. Duis
            nulla est laborum cupidatat ad velit irure sit. Aliqua anim fugiat
            exercitation veniam et dolor laboris excepteur.
        `}
      actions={
        !done && (
          <Button isFullWidth colorScheme="blue" onClick={handleNextLevel}>
            Next
          </Button>
        )
      }
    >
      <Input type="hidden" {...register("level")} value={LEVELS[level]} />
      {fields.map((data, index) => (
        <Controller
          key={index}
          control={control}
          name={`written_questions.${index}.answer`}
          rules={{ required: true }}
          render={({ field, fieldState: { invalid } }) => (
            <WrittenQuestion
              index={index}
              question={data.question}
              choices={data.choices}
              isDisabled={done || data.level !== LEVELS[level]}
              isInvalid={invalid}
              {...field}
            ></WrittenQuestion>
          )}
        />
      ))}
    </Part>
  );
}

export default Written;
