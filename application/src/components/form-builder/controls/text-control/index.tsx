import { TextField } from "@mui/material";
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { ControlProps } from "../types";
import { QuestionText } from "../../components/question-text";
import { useFormBuilderState } from "../../store/form-builder-store";

type Props = {
  control: ControlProps;
};

const TextControl = forwardRef(
  ({ control }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const { question, required, uid } = control;
    const { getAnswer, saveAnswer } = useFormBuilderState();
    const [text, setText] = useState("");

    useEffect(() => {
      const answer = getAnswer(uid);
      if (answer) {
        setText(answer);
      }
    }, [getAnswer, uid]);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
      saveAnswer({ uid, question, answer: e.target.value });
    };

    return (
      <>
        <QuestionText>{question}</QuestionText>
        <TextField
          required={required}
          fullWidth
          multiline
          ref={ref}
          variant="outlined"
          value={text}
          autoFocus
          onChange={handleOnChange}
        />
      </>
    );
  }
);

export { TextControl };
