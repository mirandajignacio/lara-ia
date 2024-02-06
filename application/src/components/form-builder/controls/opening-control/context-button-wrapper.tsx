import { Box, styled } from "@mui/material";

const ContextButtonWrapper = styled(Box)`
  display: flex;
  gap: 32px;
  ${({ theme }) => theme.breakpoints.down("lg")} {
    flex-direction: column;
    gap: 16px;
  }
`;

export { ContextButtonWrapper };
