import { useCallback, useEffect, useRef, useState } from "react";
import { useWizard } from "react-use-wizard";
import { getMood } from "./utils";
import { ControlProps } from "../types";
import { npsOptions } from "./data";
import { QuestionText } from "../../components/question-text";
import {
  OptionsWrapper,
  ButtonsWrapper,
  NPSButton,
  InformationWrapper,
  TypographyStyled,
} from "./styles";
import { SubControl } from "../../components/sub-control";
import { renderControl } from "../../utils/render-control";
import { t } from "i18next";
import { useGlobalStore } from "../../../../store/global-store";
import { NPSOption } from "./types";
import { useFormBuilderState } from "../../store/form-builder-store";
import { withDelay } from "../../../../utils";

type Props = {
  control: ControlProps;
};

const NPSControl = ({ control }: Props) => {
  const { question, uid, required } = control;
  const [selected, setSelected] = useState<NPSOption | null>(null);
  const { nextStep } = useWizard();
  const { getAnswer, saveAnswer } = useFormBuilderState();
  const { showToast } = useGlobalStore();
  const textFieldRef = useRef<HTMLInputElement>(null);
  const subControl =
    "sub-control" in control ? control["sub-control"] : undefined;

  const onKeyPress = useCallback(
    (value: string) => {
      const option = npsOptions.find((option) => option.value === value);
      setSelected(option!);
      saveAnswer({ uid, question, answer: option!.value });
      const mood = getMood(Number(option?.value));
      if (subControl === undefined || mood !== subControl.conditional) {
        withDelay(nextStep, 500);
      }
    },
    [nextStep, question, saveAnswer, subControl, uid]
  );

  useEffect(() => {
    showToast(t("nps-tip"));
  }, [showToast]);

  useEffect(() => {
    const answer = getAnswer(uid);
    if (answer) {
      const nps = npsOptions.find((option) => option.value === answer);
      setSelected(nps!);
    }

    function keyPress(e: KeyboardEvent) {
      if (!isNaN(Number(e.key))) {
        onKeyPress(e.key === "0" ? "10" : e.key);
      }
    }
    addEventListener("keypress", keyPress);
    return () => {
      removeEventListener("keypress", keyPress);
    };
  }, [getAnswer, onKeyPress, showToast, uid]);

  const handleOnClickOption = (option: NPSOption) => {
    setSelected(option);
    saveAnswer({ uid, question, answer: option.value });
    const mood = getMood(Number(option.value));
    if (subControl === undefined || mood !== subControl.conditional) {
      withDelay(nextStep, 500);
    }
  };

  return (
    <>
      <QuestionText required={required}>{question}</QuestionText>
      <OptionsWrapper>
        <ButtonsWrapper>
          {npsOptions.map((option) => {
            const isSelected = selected?.value === option.value;
            return (
              <NPSButton
                key={option.key}
                size="large"
                onClick={() => handleOnClickOption(option)}
                selected={isSelected}
                variant={isSelected ? "contained" : "outlined"}
              >
                {option.label}
              </NPSButton>
            );
          })}
        </ButtonsWrapper>
        <InformationWrapper>
          <TypographyStyled variant="h5">{t("nps-low")}</TypographyStyled>
          <TypographyStyled variant="h5">{t("nps-high")}</TypographyStyled>
        </InformationWrapper>
      </OptionsWrapper>
      {subControl &&
      selected &&
      getMood(Number(selected)) === subControl.conditional ? (
        <SubControl>
          {renderControl(subControl.control, textFieldRef)}
        </SubControl>
      ) : null}
    </>
  );
};

export { NPSControl };
