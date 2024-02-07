import { Box, Button, Typography, styled } from "@mui/material";

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
  position: relative;
  font-size: 56px;
  ${({ selected }) => selected && "animation: flash 0.5s;"}
  ${({ theme }) => theme.breakpoints.down("lg")} {
    font-size: 32px;
    width: 60px;
    height: 60px;
  }
`;

const KeypressLabel = styled(Typography)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 24px;
  height: 24px;
  font-weight: 600;
`;

export { MoodButtonsWrapper, MoodButton, KeypressLabel };
