import { Box, Button, styled } from "@mui/material";
import { useWizard } from "react-use-wizard";
import { t } from "i18next";
import { useMutationQuarterCheck } from "../../../api/quarter-check.api";
import { useEffect, useState } from "react";
import { ControlProps } from "../controls/types";
import { renderControl } from "../utils/render-control";
import { useFormBuilderState } from "../store/form-builder-store";
import { useGlobalStore } from "../../../store/global-store";

type Props = {
  control: ControlProps;
};

const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  width: 100%;
`;

const SubmitWrapper = styled(Box)<{ shake?: string }>`
  align-self: self-start;
  ${({ shake }) => shake === "true" && "animation: bounceIn 0.5s;"}
  ${({ theme }) => theme.breakpoints.down("lg")} {
    display: none;
  }
`;

const ControlContainer = ({ control }: Props) => {
  const { stepCount, activeStep, nextStep, handleStep } = useWizard();
  const [shake, setShake] = useState(false);
  const isLastQuestionControl = activeStep == stepCount - 2;
  const { isPending, isSuccess, mutate } = useMutationQuarterCheck();
  const { setCurrentControl, isControlReady, answers } = useFormBuilderState();
  const { showToast } = useGlobalStore();
  const controlReady = isControlReady();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setCurrentControl(control);

    function handleKeyPress(event: KeyboardEvent) {
      if (event.key === "Enter") {
        if (controlReady && !isLastQuestionControl) {
          nextStep();
        }
        if (isLastQuestionControl && controlReady) {
          showToast(t("submit-remark"));
          setShake(true);
          setTimeout(() => {
            setShake(false);
          }, 500);
        }
      }
    }

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    control,
    controlReady,
    isLastQuestionControl,
    nextStep,
    setCurrentControl,
    showToast,
  ]);

  handleStep(() => {
    if (isLastQuestionControl) {
      mutate(answers!);

      if (!isPending && isSuccess) {
        nextStep();
      }
    }
  });

  const handleOnClickSubmit = () => {
    if (isLastQuestionControl && controlReady) {
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
        {renderControl(control)}
      </Box>
      {isLastQuestionControl ? (
        <SubmitWrapper shake={String(shake)}>
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
