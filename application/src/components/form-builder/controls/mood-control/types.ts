import { ControlBaseProps } from "../types";

type Props = {
  control: ControlBaseProps;
};

type MoodOption = {
  uid: string;
  label: string;
  value: string;
  keypress: string;
};

export type { Props, MoodOption };
