import { useState, createContext } from "react";
import { ControlProps } from "../controls/types";

type FormBuildContextType = {
  answers: Answer[];
  addAnswer: (answer: Answer) => void;
  currentControl: ControlProps | null;
  initializeControl: (control: ControlProps) => void;
  isControlCompleted: () => boolean;
};

type Answer = {
  uid: string;
  question: string;
  answer: string;
};

const FormBuilderContext = createContext<FormBuildContextType>({
  addAnswer: () => {},
  isControlCompleted: () => false,
  initializeControl: () => {},
  currentControl: null,
  answers: [],
});

type Props = {
  children: React.ReactNode;
  controls: ControlProps[];
};

const FormBuilderProvider = ({ children, controls }: Props) => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentControl, setCurrenControl] = useState<ControlProps>(
    controls[0]
  );

  const isControlCompleted = () => {
    if (currentControl?.required) {
      const index = answers.findIndex(
        (item) => item.uid === currentControl.uid
      );
      return index !== -1;
    }
    return true;
  };

  const initializeControl = (control: ControlProps) => {
    setCurrenControl(control);
  };

  const addAnswer = (answer: Answer) => {
    const index = answers.findIndex(
      (item) => item.question === answer.question
    );
    if (index !== -1) {
      const newAnswers = [...answers];
      newAnswers[index] = answer;
      setAnswers(newAnswers);
      return;
    }
    setAnswers([...answers, answer]);
  };

  return (
    <FormBuilderContext.Provider
      value={{
        answers,
        addAnswer,
        initializeControl,
        currentControl,
        isControlCompleted,
      }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
};

export { FormBuilderContext, FormBuilderProvider };
export type { FormBuildContextType, Answer };
