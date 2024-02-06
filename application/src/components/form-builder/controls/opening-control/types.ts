import { ControlBaseProps } from "../types";

type Context = {
  uid: string;
  label: string;
  text: string;
};

type OpeningControlProps = ControlBaseProps & {
  context?: Context[];
};

export type { OpeningControlProps, Context };
