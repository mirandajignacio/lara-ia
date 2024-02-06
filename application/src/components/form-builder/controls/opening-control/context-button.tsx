import { Box, Button, Modal, Typography, styled } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import Markdown from "react-markdown";

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

type Props = {
  context: {
    uid: string;
    label: string;
    text: string;
  };
};

const ContextButton = ({ context }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="outlined"
        key={context.uid}
        size="medium"
        onClick={handleOpen}
      >
        {context.label}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BoxModal>
          <Markdown
            components={{
              ul: ({ children }) => {
                return (
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      marginBottom: "33px",
                    }}
                  >
                    {children}
                  </ul>
                );
              },
              li: ({ children }) => {
                return (
                  <li
                    style={{
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    <Typography
                      variant="h5"
                      textAlign="start"
                      maxWidth="1000px"
                    >
                      {children}
                    </Typography>
                  </li>
                );
              },
              p: ({ children }) => {
                return (
                  <Typography
                    variant="h5"
                    textAlign="start"
                    mb="33px"
                    maxWidth="1000px"
                  >
                    {children}
                  </Typography>
                );
              },
            }}
          >
            {context.text}
          </Markdown>

          <Button
            onClick={handleClose}
            size="large"
            variant="contained"
            style={{
              marginLeft: "auto",
            }}
          >
            {t("close")}
          </Button>
        </BoxModal>
      </Modal>
    </>
  );
};

export { ContextButton };
