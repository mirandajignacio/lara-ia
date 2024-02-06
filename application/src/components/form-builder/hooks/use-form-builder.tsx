import { useContext } from "react";
import { FormBuilderContext } from "../context/form-builder-context";

const useFormBuilder = () => {
  const {
    answers,
    addAnswer,
    currentControl,
    initializeControl,
    isControlCompleted,
  } = useContext(FormBuilderContext);
  return {
    answers,
    addAnswer,
    currentControl,
    initializeControl,
    isControlCompleted,
  };
};

export { useFormBuilder };
