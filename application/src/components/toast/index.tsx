import { useEffect, useState } from "react";
import { useGlobalStore } from "../../store/global-store";
import { Snackbar, styled } from "@mui/material";

const StyledSnackbar = styled(Snackbar)`
  .MuiSnackbarContent-root {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.text.primary};
    background-color: rgb(80, 72, 229, 0.08);
  }
  ${({ theme }) => theme.breakpoints.down("lg")} {
    display: none;
  }
`;

const Toast = () => {
  const { toast } = useGlobalStore();
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    if (toast !== null) {
      setContent(toast);
    }
  }, [toast]);

  return (
    <StyledSnackbar
      open={toast !== null}
      autoHideDuration={3000}
      message={content}
      onClose={() => useGlobalStore.setState({ toast: null })}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    />
  );
};

export { Toast };
