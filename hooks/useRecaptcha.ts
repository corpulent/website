import { useEffect, useRef } from "react";
import { useVerifyRecaptcha } from "./useVerifyRecaptcha";
import { useIpAddress } from "./useIpAddress";
import { useExecuteRecaptcha } from "./useExecuteRecaptcha";

/* TODO: Handle errors! */
export const useRecaptcha = (siteKey: string, action: string) => {
  const ipAddressQuery = useIpAddress();
  const executeRecaptchaMutation = useExecuteRecaptcha();
  const verifyRecaptchaMutation = useVerifyRecaptcha();

  /* Do not execute reCAPTCHA if it was previously executed. Otherwise reCAPTCHA
   * will throw an error saying "Error: No reCAPTCHA clients exist (reCAPTCHA v3)".
   */
  const executedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!ipAddressQuery.isSuccess) {
      return;
    }

    if (!executedRef.current) {
      executeRecaptchaMutation.mutate(
        {
          siteKey,
          action,
        },
        {
          onSuccess: (responseToken: string) => {
            /* Send the token to the server for verification. */
            verifyRecaptchaMutation.mutate({
              responseToken,
              userIpAddress: ipAddressQuery.data,
            });
          },
        }
      );
      executedRef.current = true;
    }
  }, [
    siteKey,
    action,
    verifyRecaptchaMutation,
    ipAddressQuery.data,
    ipAddressQuery.isSuccess,
    executeRecaptchaMutation,
  ]);
};
