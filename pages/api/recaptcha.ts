import { NextApiRequest, NextApiResponse } from "next";
import { recaptcha } from "../../utils";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === "POST") {
    const { responseToken, userIpAddress } = request.body;

    try {
      await recaptcha.verifyRecaptcha(responseToken, userIpAddress);

      /* The reCAPTCHA verification was successful. */
      response
        .status(200)
        .json({ message: "Successfully verified reCAPTCHA!" });
    } catch (error) {
      /* Handle errors during verification */
      response.status(400).json({ error: "reCAPTCHA verification failed!" });
    }

    return;
  }
  response.status(404);
};

export default handler;
