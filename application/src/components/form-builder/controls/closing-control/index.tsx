import { ControlProps } from "../types";

import { OpeningClosingText } from "../../components/opening-closing-text";

type Props = {
  control: ControlProps;
};

const ClosingControl = ({ control }: Props) => {
  const { question } = control;

  return (
    // <ControlContainer>
    <OpeningClosingText>{question}</OpeningClosingText>
    //  </ControlContainer> */
  );
};

export { ClosingControl };
