import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { api } from "../utils";
import { IEnquiry } from "../utils/notion";

export const useCreateEnquiry = (): UseMutationResult<
  unknown,
  unknown,
  IEnquiry
> => {
  return useMutation({
    mutationFn: async (enquiry: IEnquiry) => {
      await api.createEnquiry(enquiry);
    },
  });
};
