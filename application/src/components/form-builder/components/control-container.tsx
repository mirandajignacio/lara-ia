import { Box, Button, styled } from "@mui/material";
import { useWizard } from "react-use-wizard";
import { useFormBuilder } from "../hooks/use-form-builder";
import { t } from "i18next";
import { useMutationQuarterCheck } from "../../../api/quarter-check.api";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  width: 100%;
`;

const SubmitWrapper = styled(Box)<{ shake?: boolean }>`
  display: flex;
  width: 100%;
  margin-top: 30px;
  justify-content: flex-end;

  ${({ shake }) => shake && "animation: shakeX 1s;"}
  ${({ theme }) => theme.breakpoints.down("lg")} {
    display: none;
  }
`;

const ControlContainer = ({ children }: Props) => {
  const { stepCount, activeStep, nextStep, handleStep } = useWizard();
  const { answers } = useFormBuilder();
  const [shake, setShake] = useState(false);
  const isLastQuestionControl = activeStep == stepCount - 2;
  const { isPending, isSuccess, mutate } = useMutationQuarterCheck();
  const { isControlCompleted } = useFormBuilder();
  const controlCompleted = isControlCompleted();

  const remarkSubmitButton = () => {
    setShake(true);
    setTimeout(() => {
      setShake(false);
    }, 2000);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    function handleKeyPress(event: KeyboardEvent) {
      if (event.key === "Enter") {
        if (controlCompleted && !isLastQuestionControl) {
          nextStep();
        }
        if (isLastQuestionControl && controlCompleted) {
          remarkSubmitButton();
        }
      }
    }

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [controlCompleted, isLastQuestionControl, nextStep]);

  handleStep(() => {
    if (isLastQuestionControl) {
      mutate(answers);

      if (!isPending && isSuccess) {
        nextStep();
      }
    }
  });

  const handleOnClickSubmit = () => {
    if (isLastQuestionControl && isControlCompleted()) {
      nextStep();
    }
  };

  return (
    <Container id="control-container">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap="30px"
        maxWidth="1000px"
        width="100%"
      >
        {children}
      </Box>
      {isLastQuestionControl ? (
        <SubmitWrapper shake={shake}>
          <Button
            size="large"
            variant="contained"
            onClick={handleOnClickSubmit}
          >
            {t("send-responses")}
          </Button>
        </SubmitWrapper>
      ) : null}
    </Container>
  );
};

export { ControlContainer };
