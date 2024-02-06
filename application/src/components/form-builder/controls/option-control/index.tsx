import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { ControlContainer } from "../../components/control-container";
import { useWizard } from "react-use-wizard";
import { useFormBuilder } from "../../hooks/use-form-builder";
import { renderControl } from "../../utils/render-control";
import { getMood } from "./utils";
import { OptionControlProps } from "./types";
import { QuestionText } from "../../components/question-text";
import { OptionButton } from "./option-button";

type Props = {
  control: OptionControlProps;
};

const OptionsControl = ({ control }: Props) => {
  const { question, uid, options, required } = control;
  const [selected, setSelected] = useState<null | string>(null);
  const { nextStep } = useWizard();
  const { addAnswer, items, initializeControl } = useFormBuilder();
  const subControl =
    "sub-control" in control ? control["sub-control"] : undefined;

  useEffect(() => {
    initializeControl(control);
    const index = items.findIndex((item) => item.uid === uid);
    if (index !== -1) {
      setSelected(items[index].answer);
    }
  }, [control, initializeControl, items, uid]);

  const handleOnClickOption = (value: string) => {
    setSelected(value);
    addAnswer({ uid, question, answer: value.toString() });
    const mood = getMood(value, options);
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
        <Box
          display="flex"
          gap="12px"
          flexDirection="column"
          alignItems="baseline"
        >
          {options.map((option) => {
            const isSelected = option.uid === selected;
            return (
              <OptionButton
                key={option.uid}
                size="large"
                selected={isSelected}
                variant={isSelected ? "contained" : "outlined"}
                color="primary"
                onClick={() => handleOnClickOption(option.value)}
              >
                {option.label}
              </OptionButton>
            );
          })}
        </Box>
        {subControl &&
        selected &&
        getMood(selected, options) === subControl.conditional
          ? renderControl(subControl.control)
          : null}
      </>
    </ControlContainer>
  );
};

export { OptionsControl };
