import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useWizard } from "react-use-wizard";

import { getMood } from "./utils";
import { ControlProps } from "../types";
import { useFormBuilder } from "../../hooks/use-form-builder";
import { ControlContainer } from "../../components/control-container";
import { npsOptions } from "./data";
import { QuestionText } from "../../components/question-text";
import {
  OptionsWrapper,
  ButtonsWrapper,
  NPSButton,
  InformationWrapper,
} from "./styles";
import { SubControl } from "../../components/sub-control";
import { renderControl } from "../../utils/render-control";
import { t } from "i18next";

type Props = {
  control: ControlProps;
};

const NPSControl = ({ control }: Props) => {
  const { question, uid, required } = control;
  const [selected, setSelected] = useState<null | string>(null);
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
      setSelected(answers[index].answer.toString());
    }
  }, [control, initializeControl, answers, uid]);

  const handleOnClickOption = (value: string) => {
    setSelected(value);
    addAnswer({ uid, question, answer: value.toString() });
    const mood = getMood(Number(value));
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
        <OptionsWrapper>
          <ButtonsWrapper>
            {npsOptions.map((option) => {
              const isSelected = selected === option.value;
              return (
                <NPSButton
                  key={option.key}
                  size="large"
                  onClick={() => handleOnClickOption(option.value)}
                  selected={isSelected}
                  variant={isSelected ? "contained" : "outlined"}
                >
                  {option.label}
                </NPSButton>
              );
            })}
          </ButtonsWrapper>
          <InformationWrapper>
            <Typography variant={lessThanLarge ? "body1" : "h5"}>
              {t("nps-low")}
            </Typography>
            <Typography variant={lessThanLarge ? "body1" : "h5"}>
              {t("nps-high")}
            </Typography>
          </InformationWrapper>
        </OptionsWrapper>
        {subControl &&
        selected &&
        getMood(Number(selected)) === subControl.conditional ? (
          <SubControl>{renderControl(subControl.control)}</SubControl>
        ) : null}
      </>
    </ControlContainer>
  );
};

export { NPSControl };
