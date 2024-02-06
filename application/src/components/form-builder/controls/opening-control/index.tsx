import { Box, Button, styled } from "@mui/material";
import { useWizard } from "react-use-wizard";
import { useTranslation } from "react-i18next";
import { OpeningControlProps } from "./types";
import { ControlContainer } from "../../components/control-container";

import { ContextButton } from "./context-button";
import { OpeningClosingText } from "../../components/opening-closing-text";
import { ContextButtonWrapper } from "./styles";

type Props = {
  control: OpeningControlProps;
};

const StartButton = styled(Button)`
  margin-bottom: 30px;
  width: fit-content;
`;

const OpeningControl = ({ control }: Props) => {
  const { nextStep } = useWizard();
  const { question, context } = control;
  const { t } = useTranslation();
  return (
    <ControlContainer>
      <>
        <Box>
          <OpeningClosingText>{question}</OpeningClosingText>
        </Box>
        <Box
          display="flex"
          flexDirection={"column"}
          alignItems={"center"}
          alignSelf={"center"}
        >
          <StartButton
            variant="contained"
            color="primary"
            onClick={nextStep}
            size="large"
          >
            {t("start")}
          </StartButton>
          <ContextButtonWrapper>
            {context?.map((c) => (
              <ContextButton key={c.uid} {...c} />
            ))}
          </ContextButtonWrapper>
        </Box>
      </>
    </ControlContainer>
  );
};

export { OpeningControl };
