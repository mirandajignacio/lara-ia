import { Box, Button, styled } from "@mui/material";

const MoodButtonsWrapper = styled(Box)`
  display: flex;
  gap: 12px;
  ${({ theme }) => theme.breakpoints.down("lg")} {
    flex-direction: column;
  }
`;

const MoodButton = styled(Button)<{ selected?: boolean }>`
  height: 104px;
  width: 99px;
  ${({ theme }) => theme.breakpoints.down("lg")} {
    width: 60px;
    height: 60px;
  }
`;

export { MoodButtonsWrapper, MoodButton };
