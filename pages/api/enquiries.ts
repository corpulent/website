import { NextApiRequest, NextApiResponse } from "next";

import { notion } from "../../utils";

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse,
): Promise<void> => {
  // response.setHeader("Access-Control-Allow-Credentials", "true");
  // response.setHeader("Access-Control-Allow-Origin", "*");

  if (request.method === "POST") {
    try {
      await notion.createEnquiryRow(request.body);
      response.json({ message: "Successfully created an enquiry." });
    } catch (error) {
      console.error("Error creating enquiry:", error);
      response.status(500).json({ message: "Failed to create enquiry." });
    }
  }
};

export default handler;
