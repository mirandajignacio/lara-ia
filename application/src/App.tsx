import CssBaseline from "@mui/material/CssBaseline";
import { Default } from "./pages/default";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Default />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
