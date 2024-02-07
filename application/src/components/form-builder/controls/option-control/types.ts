import { ControlBaseProps } from "../types";

type Option = {
  uid: string;
  label: string;
  value: string;
};

type OptionControlProps = ControlBaseProps & {
  options: Option[];
};

export type { OptionControlProps, Option };
