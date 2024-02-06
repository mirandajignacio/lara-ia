import { Wizard } from "react-use-wizard";

import { Navigation } from "./components/navigation";
import { AnimatedStep } from "./components/animated-step";
import { useRef } from "react";
import { renderControl } from "./utils/render-control";
import { FormBuilderProvider } from "./context/form-builder-context";
import { ControlProps } from "./controls/types";

type Props = {
  controls: ControlProps[];
};

const FormBuilder = ({ controls }: Props) => {
  const previousStep = useRef<number>(0);

  return (
    <FormBuilderProvider controls={controls}>
      <Wizard startIndex={0} footer={<Navigation />}>
        {controls.map((control, index) => {
          return (
            <AnimatedStep key={index} previousStep={previousStep}>
              {renderControl(control)}
            </AnimatedStep>
          );
        })}
      </Wizard>
    </FormBuilderProvider>
  );
};

export { FormBuilder };
