import { Box } from "@mui/material";

import { ControlContainer } from "../../components/control-container";
import { ControlProps } from "../types";
import { QuestionText } from "../../components/question-text";

type Props = {
  control: ControlProps;
};

const ClosingControl = ({ control }: Props) => {
  const { question, required } = control;

  return (
    <ControlContainer>
      <>
        <Box>
          <QuestionText required={required}>{question}</QuestionText>
        </Box>
      </>
    </ControlContainer>
  );
};

export { ClosingControl };
