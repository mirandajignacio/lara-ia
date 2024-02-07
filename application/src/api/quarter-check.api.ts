import { useMutation, useQuery } from "@tanstack/react-query";
import { LenguageType } from "../common/types";
import { ControlProps } from "../components/form-builder/controls/types";
import { Answer } from "../components/form-builder/store/form-builder-store";

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

export const saveQuarterCheck = async (data: Answer[]) => {
  const res = await fetch(
    "https://lara-ia-backend.vercel.app/api/quarter-check",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

const useQuarterCheck = () => {
  return useQuery({ queryKey: ["quarter-check"], queryFn: fetchQuarterCheck });
};

const useMutationQuarterCheck = () => {
  const { mutate, data, isPending, isSuccess } = useMutation({
    mutationFn: saveQuarterCheck,
  });

  return { mutate, data, isPending, isSuccess };
};

export { useQuarterCheck, useMutationQuarterCheck };
