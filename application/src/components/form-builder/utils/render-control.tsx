import { RefObject } from "react";
import { ClosingControl } from "../controls/closing-control";
import { MoodControl } from "../controls/mood-control";
import { NPSControl } from "../controls/nps-control";
import { OpeningControl } from "../controls/opening-control";
import { OpeningControlProps } from "../controls/opening-control/types";
import { OptionsControl } from "../controls/option-control";
import { OptionControlProps } from "../controls/option-control/types";
import { TextControl } from "../controls/text-control";
import { ControlBaseProps, ControlProps } from "../controls/types";

const renderControl = (
  control: ControlProps,
  ref?: RefObject<HTMLInputElement>
) => {
  const { "control-type": controlType } = control;
  switch (controlType) {
    case "opening":
      return (
        <OpeningControl
          key={control.uid}
          control={control as OpeningControlProps}
        />
      );
    case "mood":
      return (
        <MoodControl key={control.uid} control={control as ControlBaseProps} />
      );
    case "option":
      return (
        <OptionsControl
          key={control.uid}
          control={control as OptionControlProps}
        />
      );
    case "nps":
      return (
        <NPSControl key={control.uid} control={control as ControlBaseProps} />
      );
    case "text":
      return (
        <TextControl
          key={control.uid}
          control={control as ControlBaseProps}
          ref={ref}
        />
      );
    case "closing":
      return (
        <ClosingControl
          key={control.uid}
          control={control as ControlBaseProps}
        />
      );
    default:
      return null;
  }
};

export { renderControl };
