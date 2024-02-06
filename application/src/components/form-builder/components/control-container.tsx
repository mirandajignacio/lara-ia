import { Box, Button, styled } from "@mui/material";
import { useWizard } from "react-use-wizard";
import { useFormBuilder } from "../hooks/use-form-builder";
import { t } from "i18next";
import { useMutationQuarterCheck } from "../../../api/quarter-check.api";
import { useEffect } from "react";

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

const SubmitWrapper = styled(Box)`
  display: flex;
  width: 100%;
  margin-top: 30px;
  justify-content: flex-end;
  ${({ theme }) => theme.breakpoints.down("lg")} {
    display: none;
  }
`;

const ControlContainer = ({ children }: Props) => {
  const { stepCount, activeStep, nextStep, handleStep } = useWizard();
  const { answers } = useFormBuilder();
  const isLastQuestionControl = activeStep == stepCount - 2;
  const { isPending, isSuccess, mutate } = useMutationQuarterCheck();

  handleStep(() => {
    if (isLastQuestionControl) {
      mutate(answers);

      if (!isPending && isSuccess) {
        nextStep();
      }
    }
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <Container id="control-container">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="baseline"
        gap="30px"
        maxWidth="1000px"
        width="100%"
      >
        {children}
      </Box>
      {isLastQuestionControl ? (
        <SubmitWrapper>
          <Button size="large" variant="contained" onClick={nextStep}>
            {t("send-responses")}
          </Button>
        </SubmitWrapper>
      ) : null}
    </Container>
  );
};

export { ControlContainer };
