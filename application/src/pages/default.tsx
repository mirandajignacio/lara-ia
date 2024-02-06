import { Box } from "@mui/material";

import { FormBuilder } from "../components/form-builder";
import { initializeInternalization } from "../i18n";
import { useQuarterCheck } from "../api/quarter-check.api";

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
    <Box
      display="flex"
      width="100dvw"
      height="100dvh"
      alignItems="center"
      justifyContent="center"
    >
      <FormBuilder controls={controls} />
    </Box>
  );
};

export { Default };
