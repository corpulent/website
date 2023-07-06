import { useMutation } from "@tanstack/react-query";
import { recaptcha } from "../utils";

export interface IUseExecuteRecaptchMutationParameters {
  siteKey: string;
  action: string;
}

export const useExecuteRecaptcha = () =>
  useMutation({
    mutationFn: async (parameters: IUseExecuteRecaptchMutationParameters) =>
      await recaptcha.executeRecaptcha(parameters.siteKey, parameters.action),
  });
