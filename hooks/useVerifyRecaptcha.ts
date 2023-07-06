import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { api } from "../utils";

export interface IUseVerifyRecaptchaMutationParameters {
  responseToken: string;
  userIpAddress: string;
}

export const useVerifyRecaptcha = (): UseMutationResult<
  any,
  unknown,
  IUseVerifyRecaptchaMutationParameters
> =>
  useMutation({
    mutationFn: async (parameters: IUseVerifyRecaptchaMutationParameters) =>
      await api.verifyRecaptcha(parameters),
  });
