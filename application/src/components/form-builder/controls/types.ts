import { OpeningControlProps } from "./opening-control/types";
import { OptionControlProps } from "./option-control/types";

type ControlBaseProps = {
  uid: string;
  question: string;
  required?: boolean;
  "control-type": "text" | "option" | "mood" | "nps" | "opening" | "closing";
  "sub-control"?: {
    conditional?: "positive" | "negative" | "neutral";
    control: ControlBaseProps;
  };
};

type ControlProps = ControlBaseProps | OpeningControlProps | OptionControlProps;

export type { ControlBaseProps, ControlProps };
