import { Box, Button, styled } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useWizard } from "react-use-wizard";
import { useFormBuilder } from "../hooks/use-form-builder";
import { t } from "i18next";
import { useEffect } from "react";

const NavigationButton = styled(Button)`
  height: 56px;
  padding: 15px;
  span {
    margin: 0;
  }
`;

const Container = styled(Box)`
  position: absolute;
  display: flex;
  gap: 12px;
  right: 30px;
  bottom: 30px;
  ${({ theme }) => theme.breakpoints.down("lg")} {
    .label {
      display: none;
    }
  }
`;

const SubmitButton = styled(NavigationButton)`
  ${({ theme }) => theme.breakpoints.up("lg")} {
    display: none;
  }
`;

const Navigation = () => {
  const {
    nextStep,
    stepCount,
    isFirstStep,
    previousStep,
    isLastStep,
    activeStep,
  } = useWizard();
  const { isControlCompleted } = useFormBuilder();
  const controlCompleted = isControlCompleted();
  const isLastQuestionControl = activeStep == stepCount - 2;

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (event.key === "Enter") {
        if (controlCompleted) {
          nextStep();
        }
      }
    }

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [controlCompleted, nextStep]);

  return isFirstStep || isLastStep ? null : (
    <Container>
      <NavigationButton
        onClick={previousStep}
        variant="contained"
        startIcon={<ArrowBackIosNewIcon />}
      >
        <p className="label">{t("previous-step")}</p>
      </NavigationButton>
      {activeStep < stepCount - 2 ? (
        <NavigationButton
          onClick={nextStep}
          variant="contained"
          disabled={!controlCompleted}
          endIcon={<ArrowForwardIosIcon />}
        >
          <p className="label">{t("next-step")}</p>
        </NavigationButton>
      ) : null}
      {isLastQuestionControl ? (
        <SubmitButton size="large" variant="contained" onClick={nextStep}>
          {t("send-responses")}
        </SubmitButton>
      ) : null}
    </Container>
  );
};

export { Navigation };
