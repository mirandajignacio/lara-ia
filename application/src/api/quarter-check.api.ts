import { useQuery } from "@tanstack/react-query";
import { LenguageType } from "../common/types";
import { ControlProps } from "../components/form-builder/controls/types";

type FormBuilderSettings = {
  uid: string;
  lenguage: LenguageType;
  controls: ControlProps[];
};

export const fetchQuarterCheck = async () => {
  const res = await fetch(
    "https://lara-ia-backend.vercel.app/api/quarter-check"
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  const form: FormBuilderSettings = data;
  return form;
};

export const useQuarterCheck = () => {
  return useQuery({ queryKey: ["groups"], queryFn: fetchQuarterCheck });
};
