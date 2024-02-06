import {
  Box,
  Button,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useEffect, useState } from "react";

import { useWizard } from "react-use-wizard";

import { useFormBuilder } from "../../hooks/use-form-builder";
import { ControlContainer } from "../../components/control-container";
import { renderControl } from "../../utils/render-control";
import { MoodOption, Props } from "./types";
import { getMood } from "./utils";
import { moodOptions } from "./data";
import { QuestionText } from "../../components/question-text";

const MoodButtonsWrapper = styled(Box)`
  display: flex;
  gap: 12px;
  ${({ theme }) => theme.breakpoints.down("lg")} {
    flex-direction: column;
  }
`;

const MoodButton = styled(Button)<{ selected?: boolean }>`
  height: 104px;
  width: 99px;
  ${({ theme }) => theme.breakpoints.down("lg")} {
    width: 60px;
    height: 60px;
  }
`;

const MoodControl = ({ control }: Props) => {
  const { question, uid, required } = control;
  const [selected, setSelected] = useState<MoodOption | null>(null);
  const { nextStep } = useWizard();
  const { addAnswer, answers, initializeControl } = useFormBuilder();
  const theme = useTheme();
  const lessThanLarge = useMediaQuery(theme.breakpoints.down("lg"));
  const subControl =
    "sub-control" in control ? control["sub-control"] : undefined;

  useEffect(() => {
    initializeControl(control);
    const index = answers.findIndex((a) => a.uid === uid);
    if (index !== -1) {
      const mood = moodOptions.find(
        (option) => option.label === answers[index].answer
      );
      setSelected(mood!);
    }
  }, [control, initializeControl, answers, uid]);

  const handleOnClickOption = (option: MoodOption) => {
    setSelected(option);
    addAnswer({ uid, question, answer: option.label });
    const mood = getMood(option.value);
    if (subControl === undefined || mood !== subControl.conditional) {
      setTimeout(() => {
        nextStep();
      }, 500);
    }
  };

  return (
    <ControlContainer>
      <>
        <QuestionText required={required}>{question}</QuestionText>
        <MoodButtonsWrapper>
          {moodOptions.map((option) => {
            const isOptionSelected = selected?.uid === option.uid;
            const variant = isOptionSelected ? "contained" : "outlined";

            return (
              <MoodButton
                key={option.value}
                onClick={() => handleOnClickOption(option)}
                variant={variant}
                selected={isOptionSelected}
              >
                <Typography variant={lessThanLarge ? "h2" : "h1"}>
                  {option.label}
                </Typography>
              </MoodButton>
            );
          })}
        </MoodButtonsWrapper>
        {subControl &&
        selected &&
        getMood(selected.value) === subControl.conditional
          ? renderControl(subControl.control)
          : null}
      </>
    </ControlContainer>
  );
};

export { MoodControl };
