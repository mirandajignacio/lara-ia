import { Box, Typography } from "@mui/material";
import Markdown from "react-markdown";

type Props = {
  children: string;
};

const OpeningClosingText = ({ children }: Props) => {
  return (
    <Box alignSelf="center">
      <Markdown
        components={{
          p: ({ children }) => {
            return (
              <Typography
                variant="h5"
                textAlign="center"
                mb="33px"
                maxWidth="1000px"
              >
                {children}
              </Typography>
            );
          },
        }}
      >
        {children}
      </Markdown>
    </Box>
  );
};

export { OpeningClosingText };
