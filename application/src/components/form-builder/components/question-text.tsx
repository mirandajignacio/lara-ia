import { Typography, styled } from "@mui/material";
import Markdown from "react-markdown";

type Props = {
  children: string;
  required?: boolean;
};

const TypographyStyled = styled(Typography)<{ required?: boolean }>`
  :after {
    content: ${({ required }) => (required ? "' *'" : "''")};
    color: ${({ theme }) => theme.palette.error.main};
  }
  ${({ theme }) => theme.breakpoints.down("lg")} {
    font-size: ${({ theme }) => theme.typography.h5};
  }
`;

const QuestionText = ({ children, required }: Props) => {
  return (
    <Markdown
      components={{
        h2: ({ children }) => {
          return (
            <TypographyStyled variant="h2" required={required}>
              {children}
            </TypographyStyled>
          );
        },
      }}
    >
      {children}
    </Markdown>
  );
};

export { QuestionText };
