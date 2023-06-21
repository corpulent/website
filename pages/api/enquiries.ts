import { NextApiRequest, NextApiResponse } from "next";

import { notion } from "../../utils";

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  // response.setHeader("Access-Control-Allow-Credentials", "true");
  // response.setHeader("Access-Control-Allow-Origin", "*");

  if (request.method === "POST") {
    await notion.createEnquiryRow(request.body);
    response.json({ message: "Successfully created an enquiry." });
  }
};

export default handler;
