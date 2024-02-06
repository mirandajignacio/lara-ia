import { Box, Button, styled } from "@mui/material";

const NPSButton = styled(Button)<{ selected?: boolean }>`
  font-size: 36px;
  width: 70px;
  height: 70px;
  padding: 0;
  ${({ theme, selected }) =>
    !selected && `color: ${theme.palette.text.primary};`}
  ${({ theme }) => theme.breakpoints.down("lg")} {
    min-height: auto;
    min-width: auto;
    padding: 0;
    width: 50px;
    height: 50px;
    font-size: 24px;
  }
`;

const InformationWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 8px;
  margin-bottom: 72px;

  ${({ theme }) => theme.breakpoints.down("lg")} {
    flex-direction: column;
    margin-bottom: 0;
    font-size: 6px;
  }
`;

const OptionsWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 0;
  align-self: center;
  ${({ theme }) => theme.breakpoints.down("lg")} {
    flex-direction: column-reverse;
    align-self: flex-start;
  }
`;

const ButtonsWrapper = styled(Box)`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: start;
  ${({ theme }) => theme.breakpoints.down("lg")} {
    gap: 5px;
  }
`;

export { NPSButton, InformationWrapper, OptionsWrapper, ButtonsWrapper };
