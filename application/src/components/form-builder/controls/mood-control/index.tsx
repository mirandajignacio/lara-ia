import { useEffect, useState } from "react";
import { useWizard } from "react-use-wizard";
import { renderControl } from "../../utils/render-control";
import { MoodOption, Props } from "./types";
import { getMood } from "./utils";
import { moodOptions } from "./data";
import { QuestionText } from "../../components/question-text";
import { MoodButton, MoodButtonsWrapper } from "./styles";
import { SubControl } from "../../components/sub-control";
import { useFormBuilderState } from "../../store/form-builder-store";

const MoodControl = ({ control }: Props) => {
  const { question, uid, required } = control;
  const [selected, setSelected] = useState<MoodOption | null>(null);
  const { nextStep } = useWizard();
  const { saveAnswer, answers, getAnswer } = useFormBuilderState();
  const subControl =
    "sub-control" in control ? control["sub-control"] : undefined;

  useEffect(() => {
    if (answers !== null) {
      const answer = getAnswer(uid);
      if (answer) {
        const mood = moodOptions.find((option) => option.label === answer);
        setSelected(mood!);
      }
    }
  }, [answers, getAnswer, uid]);

  const handleOnClickOption = (option: MoodOption) => {
    setSelected(option);
    saveAnswer({ uid, question, answer: option.label });
    const mood = getMood(option.value);
    if (subControl === undefined || mood !== subControl.conditional) {
      nextStep();
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
              {option.label}
            </MoodButton>
          );
        })}
      </MoodButtonsWrapper>
      {subControl &&
      selected &&
      getMood(selected.value) === subControl.conditional ? (
        <SubControl>{renderControl(subControl.control)}</SubControl>
      ) : null}
    </>
  );
};

export { MoodControl };
