import { Typography, useMediaQuery, useTheme } from "@mui/material";
import Markdown from "react-markdown";

type Props = {
  children: string;
  required?: boolean;
};

const QuestionText = ({ children, required }: Props) => {
  const theme = useTheme();
  const lessThanLarge = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Markdown
      components={{
        h2: ({ children }) => {
          return (
            <Typography variant={lessThanLarge ? "h5" : "h2"}>
              {children}
              {required && (
                <Typography
                  variant={lessThanLarge ? "h5" : "h2"}
                  display={"inline"}
                  color="error"
                >
                  {` *`}
                </Typography>
              )}
            </Typography>
          );
        },
      }}
    >
      {children}
    </Markdown>
  );
};

export { QuestionText };
