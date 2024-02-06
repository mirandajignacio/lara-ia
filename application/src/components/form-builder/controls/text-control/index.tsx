import { TextField } from "@mui/material";

import { ChangeEvent, useEffect, useState } from "react";

import { ControlProps } from "../types";
import { useFormBuilder } from "../../hooks/use-form-builder";
import { ControlContainer } from "../../components/control-container";
import { QuestionText } from "../../components/question-text";

type Props = {
  control: ControlProps;
};

const TextControl = ({ control }: Props) => {
  const { question, required, uid } = control;
  const [answer, setAnswer] = useState("");
  const { initializeControl, answers, addAnswer } = useFormBuilder();

  useEffect(() => {
    initializeControl(control);
    const index = answers.findIndex((a) => a.uid === uid);
    if (index !== -1) {
      setAnswer(answers[index].answer);
    }
  }, [control, initializeControl, answers, uid]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
    addAnswer({ uid, question, answer: e.target.value });
  };

  return (
    <ControlContainer>
      <>
        <QuestionText>{question}</QuestionText>
        <TextField
          required={required}
          fullWidth
          multiline
          variant="outlined"
          value={answer}
          onChange={handleOnChange}
        />
      </>
    </ControlContainer>
  );
};

export { TextControl };
