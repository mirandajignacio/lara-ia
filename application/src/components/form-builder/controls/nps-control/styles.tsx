import { Box, Button, Typography, styled } from "@mui/material";

const NPSButton = styled(Button)<{ selected?: boolean }>`
  font-size: 36px;
  width: 70px;
  height: 70px;
  padding: 0;
  font-weight: 400;
  ${({ selected }) => selected && "animation: flash 0.5s;"}
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
  width: fit-content;
  ${({ theme }) => theme.breakpoints.down("lg")} {
    flex-direction: column-reverse;
    align-self: flex-start;
  }
`;

const ButtonsWrapper = styled(Box)`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  ${({ theme }) => theme.breakpoints.down("lg")} {
    gap: 5px;
  }
`;
const TypographyStyled = styled(Typography)`
  ${({ theme }) => theme.breakpoints.down("lg")} {
    font-size: ${({ theme }) => theme.typography.body1};
  }
`;

export {
  NPSButton,
  InformationWrapper,
  OptionsWrapper,
  ButtonsWrapper,
  TypographyStyled,
};
