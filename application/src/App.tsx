import CssBaseline from "@mui/material/CssBaseline";
import { Default } from "./pages/default";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import "animate.css";
import { Toast } from "./components/toast";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Default />
        </QueryClientProvider>
        <Toast />
      </ThemeProvider>
    </>
  );
}

export default App;
