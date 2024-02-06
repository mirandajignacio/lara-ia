import { useEffect, useState } from "react";
import { useGlobalStore } from "../../store/global-store";
import { Snackbar } from "@mui/material";

const Toast = () => {
  const { toast } = useGlobalStore();
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    if (toast !== null) {
      setContent(toast);
    }
  }, [toast]);

  return (
    <Snackbar
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
