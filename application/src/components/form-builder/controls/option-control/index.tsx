import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useWizard } from "react-use-wizard";
import { renderControl } from "../../utils/render-control";
import { getMood } from "./utils";
import { Option, OptionControlProps } from "./types";
import { QuestionText } from "../../components/question-text";
import { OptionButton } from "./option-button";
import { SubControl } from "../../components/sub-control";
import { useFormBuilderState } from "../../store/form-builder-store";
import { withDelay } from "../../../../utils";

type Props = {
  control: OptionControlProps;
};

const OptionsControl = ({ control }: Props) => {
  const { question, uid, options, required } = control;
  const [selected, setSelected] = useState<Option | null>(null);
  const { nextStep } = useWizard();
  const { saveAnswer, getAnswer } = useFormBuilderState();

  const subControl =
    "sub-control" in control ? control["sub-control"] : undefined;

  useEffect(() => {
    const answer = getAnswer(uid);
    if (answer) {
      const option = options.find((option) => option.label === answer);
      setSelected(option!);
    }
  }, [getAnswer, options, uid]);

  const handleOnClickOption = (option: Option) => {
    setSelected(option);
    saveAnswer({ uid, question, answer: option.label });
    const mood = getMood(option.value, options);

    if (subControl === undefined || mood !== subControl.conditional) {
      withDelay(nextStep, 500);
    }
  };

  return (
    <>
      <QuestionText required={required}>{question}</QuestionText>
      <Box
        display="flex"
        gap="12px"
        flexDirection="column"
        alignItems="baseline"
      >
        {options.map((option) => {
          const isSelected = option.uid === selected?.uid;
          return (
            <OptionButton
              key={option.uid}
              size="large"
              selected={isSelected}
              variant={isSelected ? "contained" : "outlined"}
              color="primary"
              onClick={() => handleOnClickOption(option)}
            >
              {option.label}
            </OptionButton>
          );
        })}
      </Box>
      {subControl &&
      selected &&
      getMood(selected.value, options) === subControl.conditional ? (
        <SubControl>{renderControl(subControl.control)}</SubControl>
      ) : null}
    </>
  );
};

export { OptionsControl };
