import { useEffect } from "react";
import { useVerifyRecaptcha } from "./useVerifyRecaptcha";
import { useIpAddress } from "./useIpAddress";
import { useExecuteRecaptcha } from "./useExecuteRecaptcha";

/* TODO: Handle errors! */
export const useRecaptcha = (siteKey: string, action: string) => {
  const ipAddressQuery = useIpAddress();
  const executeRecaptchaMutation = useExecuteRecaptcha();
  const verifyRecaptchaMutation = useVerifyRecaptcha();

  useEffect(() => {
    if (!ipAddressQuery.isSuccess) {
      return;
    }

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
  }, [
    siteKey,
    action,
    verifyRecaptchaMutation,
    ipAddressQuery.data,
    ipAddressQuery.isSuccess,
    executeRecaptchaMutation,
  ]);
};
