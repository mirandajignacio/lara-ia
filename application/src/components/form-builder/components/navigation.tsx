import { Box, Button, styled } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useWizard } from "react-use-wizard";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { useFormBuilderState } from "../store/form-builder-store";

const NavigationButton = styled(Button)`
  gap: 8px;
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
    right: auto;
    bottom: auto;
    position: relative;
    margin-top: auto;
    margin-right: 32px;
    margin-bottom: 32px;
    align-self: flex-end;
    .label {
      display: none;
    }
  }
`;

const SubmitButton = styled(NavigationButton)<{ shake: boolean }>`
  ${({ shake }) => shake && "animation: bounceIn 1s;"}
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

  const isLastQuestionControl = activeStep == stepCount - 2;
  const [shake, setShake] = useState(false);
  const { isControlReady } = useFormBuilderState();
  const controlReady = isControlReady();
  const remarkSubmitButton = () => {
    setShake(true);
    setTimeout(() => {
      setShake(false);
    }, 2000);
  };

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (event.key === "Enter") {
        if (controlReady && !isLastQuestionControl) {
          nextStep();
        }
        if (isLastQuestionControl && controlReady) {
          remarkSubmitButton();
        }
      }
    }

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [controlReady, isLastQuestionControl, nextStep]);

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
          disabled={!controlReady}
          endIcon={<ArrowForwardIosIcon />}
        >
          <p className="label">{t("next-step")}</p>
        </NavigationButton>
      ) : null}
      {isLastQuestionControl ? (
        <SubmitButton
          size="large"
          variant="contained"
          onClick={nextStep}
          shake={shake}
        >
          {t("send-responses")}
        </SubmitButton>
      ) : null}
    </Container>
  );
};

export { Navigation };
