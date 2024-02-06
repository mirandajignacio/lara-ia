import { Button, styled } from "@mui/material";

const OptionButton = styled(Button)<{ selected?: boolean }>`
  font-weight: 400;
  font-size: 24px;
  ${({ theme, selected }) =>
    !selected && `color: ${theme.palette.text.primary};`}
`;

export { OptionButton };
