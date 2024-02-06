import { Box, styled } from "@mui/material";

const SubControl = styled(Box)`
  animation: fadein 0.5s linear;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export { SubControl };
