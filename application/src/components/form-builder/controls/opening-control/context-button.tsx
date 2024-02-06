import { Box, Button, Modal, Typography, styled } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import Markdown from "react-markdown";
import { BoxModal } from "./styles";
import { Context } from "./types";

const TransparentButton = styled(Button)`
  background-color: transparent;
`;
const ContextButton = ({ label, text, uid }: Context) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <TransparentButton
        variant="outlined"
        key={uid}
        size="medium"
        onClick={handleOpen}
      >
        {label}
      </TransparentButton>
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
            {text}
          </Markdown>

          <Box alignSelf="end">
            <Button onClick={handleClose} size="large" variant="contained">
              {t("close")}
            </Button>
          </Box>
        </BoxModal>
      </Modal>
    </>
  );
};

export { ContextButton };
