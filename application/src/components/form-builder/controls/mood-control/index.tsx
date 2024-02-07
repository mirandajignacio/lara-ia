import { useCallback, useEffect, useRef, useState } from "react";
import { useWizard } from "react-use-wizard";
import { renderControl } from "../../utils/render-control";
import { MoodOption, Props } from "./types";
import { getMood } from "./utils";
import { moodOptions } from "./data";
import { QuestionText } from "../../components/question-text";
import { KeypressLabel, MoodButton, MoodButtonsWrapper } from "./styles";
import { SubControl } from "../../components/sub-control";
import { useFormBuilderState } from "../../store/form-builder-store";
import { withDelay } from "../../../../utils";
import { t } from "i18next";
import { useGlobalStore } from "../../../../store/global-store";

const MoodControl = ({ control }: Props) => {
  const { question, uid, required } = control;
  const [selected, setSelected] = useState<MoodOption | null>(null);
  const { nextStep } = useWizard();
  const { saveAnswer, answers, getAnswer } = useFormBuilderState();
  const textFieldRef = useRef<HTMLInputElement>(null);
  const { showToast } = useGlobalStore();
  const subControl =
    "sub-control" in control ? control["sub-control"] : undefined;

  const onKeyPress = useCallback(
    (value: string) => {
      if (textFieldRef.current !== null) return;

      const option = moodOptions.find(
        (option) => option.keypress.toLowerCase() === value.toLowerCase()
      );

      if (option) {
        setSelected(option);
        saveAnswer({ uid, question, answer: option.label });
        const mood = getMood(option.value);
        if (subControl === undefined || mood !== subControl.conditional) {
          withDelay(nextStep, 500);
        }
      }
    },
    [nextStep, question, saveAnswer, subControl, uid]
  );

  useEffect(() => {
    showToast(t("mood-tip"));
  }, [showToast]);

  useEffect(() => {
    if (answers !== null) {
      const answer = getAnswer(uid);
      if (answer) {
        const mood = moodOptions.find((option) => option.label === answer);
        setSelected(mood!);
      }
    }

    function keyPress(e: KeyboardEvent) {
      onKeyPress(e.key);
    }
    addEventListener("keypress", keyPress);
    return () => {
      removeEventListener("keypress", keyPress);
    };
  }, [answers, getAnswer, onKeyPress, showToast, uid]);

  const handleOnClickOption = (option: MoodOption) => {
    setSelected(option);
    saveAnswer({ uid, question, answer: option.label });
    const mood = getMood(option.value);
    if (subControl === undefined || mood !== subControl.conditional) {
      withDelay(nextStep, 500);
    }
  };

  return (
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
              <KeypressLabel>{option.keypress}</KeypressLabel>
              {option.label}
            </MoodButton>
          );
        })}
      </MoodButtonsWrapper>
      {subControl &&
      selected &&
      getMood(selected.value) === subControl.conditional ? (
        <SubControl>
          {renderControl(subControl.control, textFieldRef)}
        </SubControl>
      ) : null}
    </>
  );
};

export { MoodControl };
