import { Box, Button, styled } from "@mui/material";
import { useWizard } from "react-use-wizard";
import { useFormBuilder } from "../hooks/use-form-builder";
import { t } from "i18next";

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
  const { items } = useFormBuilder();
  const isLastQuestionControl = activeStep == stepCount - 2;

  handleStep(() => {
    if (isLastQuestionControl) {
      console.log("submit", items);
    }
  });

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
