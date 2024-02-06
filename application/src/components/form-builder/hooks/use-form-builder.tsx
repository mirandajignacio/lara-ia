import { useContext } from "react";
import { FormBuilderContext } from "../context/form-builder-context";

const useFormBuilder = () => {
  const {
    items,
    addAnswer,
    currentControl,
    initializeControl,
    isControlCompleted,
  } = useContext(FormBuilderContext);
  return {
    items,
    addAnswer,
    currentControl,
    initializeControl,
    isControlCompleted,
  };
};

export { useFormBuilder };
