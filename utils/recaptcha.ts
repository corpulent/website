import axios, { AxiosResponse } from "axios";

interface RecaptchaResponse {
  success: boolean;
  score: number;
}

export const verifyRecaptcha = async (
  responseToken: string,
  userIpAddress: string
): Promise<RecaptchaResponse> => {
  const response: AxiosResponse<RecaptchaResponse> = await axios.post(
    "https://www.google.com/recaptcha/api/siteverify",
    null,
    {
      params: {
        secret: process.env.RECAPTCHA_SITE_SECRET,
        response: responseToken,
        remoteip: userIpAddress,
      },
    }
  );
  return response.data;
};

export const executeRecaptcha = (siteKey: string, action: string) =>
  new Promise<string>((resolve) => {
    window.grecaptcha.ready(async () => {
      const response = await window.grecaptcha.execute(siteKey, { action });
      resolve(response);
    });
  });
