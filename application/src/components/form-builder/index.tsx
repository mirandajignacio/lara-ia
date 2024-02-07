import { Wizard } from "react-use-wizard";
import { Navigation } from "./components/navigation";
import { AnimatedStep } from "./components/animated-step";
import { useRef } from "react";

import { ControlProps } from "./controls/types";
import { ControlContainer } from "./components/control-container";

type Props = {
  controls: ControlProps[];
};

const FormBuilder = ({ controls }: Props) => {
  const previousStep = useRef<number>(0);

  return (
    <>
      <Wizard startIndex={0} footer={<Navigation />}>
        {controls.map((control, index) => {
          return (
            <AnimatedStep key={index} previousStep={previousStep}>
              <ControlContainer control={control} />
            </AnimatedStep>
          );
        })}
      </Wizard>
    </>
  );
};

export { FormBuilder };
