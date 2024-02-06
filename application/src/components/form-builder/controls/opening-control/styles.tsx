import { Box, Button, styled } from "@mui/material";

const BoxModal = styled(Box)`
  position: absolute;
  background: ${({ theme }) => theme.palette.background.default};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px;
  max-width: 600px;
  width: 100%;
  text-align: start;
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.breakpoints.down("lg")} {
    width: calc(100% - 40px);
  }
`;

const ContextButtonWrapper = styled(Box)`
  display: flex;
  gap: 32px;
  ${({ theme }) => theme.breakpoints.down("lg")} {
    flex-direction: column;
    gap: 16px;
  }
`;

const StartButton = styled(Button)`
  margin-bottom: 30px;
  font-weight: 600;
  width: fit-content;
`;

export { ContextButtonWrapper, BoxModal, StartButton };
