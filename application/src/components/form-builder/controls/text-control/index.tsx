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
  const { initializeControl, items, addAnswer } = useFormBuilder();

  useEffect(() => {
    initializeControl(control);
    const index = items.findIndex((item) => item.uid === uid);
    if (index !== -1) {
      setAnswer(items[index].answer);
    }
  }, [control, initializeControl, items, uid]);

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
