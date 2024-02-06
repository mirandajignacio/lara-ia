import { Box, styled } from "@mui/material";

import { FormBuilder } from "../components/form-builder";
import { initializeInternalization } from "../i18n";
import { useQuarterCheck } from "../api/quarter-check.api";
const Container = styled(Box)`
  display: flex;
  width: 100dvw;
  max-width: 100dvw;
  height: 100dvh;
  overflow-x: hidden;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${({ theme }) => theme.breakpoints.down("lg")} {
    min-height: 100dvh;
    height: fit-content;
  }
`;

const Default = () => {
  const { data, isLoading, error } = useQuarterCheck();

  if (isLoading) {
    // Add Loading
    return null;
  }

  if (error) {
    // Add Error
    return null;
  }

  if (!data) {
    // Add Not Found
    return null;
  }

  const { controls, lenguage } = data;
  initializeInternalization({ leng: lenguage });

  return (
    <Container>
      <FormBuilder controls={controls} />
    </Container>
  );
};

export { Default };
