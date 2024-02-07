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
  width: fit-content;
  font-size: 56px;
  ${({ selected }) => selected && "animation: flash 0.5s;"}
  ${({ theme }) => theme.breakpoints.down("lg")} {
    font-size: 32px;
    width: 60px;
    height: 60px;
  }
`;

export { MoodButtonsWrapper, MoodButton };
