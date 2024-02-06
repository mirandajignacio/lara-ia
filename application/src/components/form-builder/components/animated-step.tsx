import { Box, styled } from "@mui/material";
import { motion, Variants } from "framer-motion";
import * as React from "react";
import { useWizard } from "react-use-wizard";

const variants: Variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 800 : -800,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 800 : -800,
      opacity: 0,
    };
  },
};

const Content = styled(Box)`
  ${({ theme }) => theme.breakpoints.down("lg")} {
    padding: 32px;
  }
`;

type Props = {
  previousStep: React.MutableRefObject<number>;
  children: React.ReactNode;
};

const AnimatedStep: React.FC<Props> = React.memo(
  ({ children, previousStep: previousStepIndex }) => {
    const { activeStep } = useWizard();

    React.useEffect(() => {
      return () => {
        previousStepIndex.current = activeStep;
      };
    }, [activeStep, previousStepIndex]);

    return (
      <motion.div
        id="animated-step"
        custom={activeStep - previousStepIndex.current}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        style={{ width: "100%", maxWidth: "1000px" }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <Content>{children}</Content>
      </motion.div>
    );
  }
);

export { AnimatedStep };
