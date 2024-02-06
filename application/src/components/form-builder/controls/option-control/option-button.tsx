import { Button, styled } from "@mui/material";

const OptionButton = styled(Button)<{ selected?: boolean }>`
  ${({ theme, selected }) =>
    !selected && `color: ${theme.palette.text.primary};`}
`;

export { OptionButton };
