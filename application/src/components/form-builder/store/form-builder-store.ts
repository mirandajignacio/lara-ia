import { create } from "zustand";
import { ControlProps } from "../controls/types";

type Answer = {
  uid: string;
  question: string;
  answer: string;
};

interface State {
  getCurrentControl: () => ControlProps | null;
  currentControl: ControlProps | null;
  setCurrentControl: (control: ControlProps) => void;
  answers: Answer[] | null;
  saveAnswer: (answer: Answer) => void;
  getAnswer: (uid: string) => string | null;
  isControlReady: () => boolean;
}

const useFormBuilderState = create<State>()((set, get) => ({
  controls: [],
  currentControl: null,
  setCurrentControl: (control) =>
    set((state) => {
      return { ...state, currentControl: control };
    }),
  getCurrentControl: () => {
    return get().currentControl;
  },
  answers: [],
  getAnswer: (uid) => {
    const answer = get().answers?.find((ans) => ans.uid === uid);
    return answer ? answer.answer : null;
  },
  isControlReady: () => {
    const control = get().currentControl;

    if (!control) {
      return false;
    }

    const answer = get().answers?.find((ans) => ans.uid === control.uid);
    if (control.required) {
      return !!answer;
    }
    return true;
  },
  saveAnswer: (answer) =>
    set((state) => {
      const index = state.answers?.findIndex((ans) => ans.uid === answer.uid);
      if (index !== undefined && index !== -1) {
        const newAnswers = [...state.answers!];
        newAnswers[index] = answer;
        return {
          answers: newAnswers,
        };
      }

      const isEmpty = state.answers === null;

      return {
        answers: isEmpty ? [answer] : [...state.answers!, answer],
      };
    }),
}));

export { useFormBuilderState };
export type { Answer };
