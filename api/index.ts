const { Client } = require("@notionhq/client");

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export interface IEnquiry {
  name: string;
  jobTitle: string;
  company: string;
  email: string;
  message: string;
}

export const createEnquiryRow = async (enquiry: IEnquiry): Promise<void> => {
  try {
    // Create a new row in the Notion database
    const response = await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: {
        Name: { title: [{ text: { content: enquiry.name } }] },
        JobTitle: { rich_text: [{ text: { content: enquiry.jobTitle } }] },
        Company: { rich_text: [{ text: { content: enquiry.company } }] },
        Email: { rich_text: [{ text: { content: enquiry.email } }] },
        Message: { rich_text: [{ text: { content: enquiry.message } }] },
      },
    });

    console.log("Enquiry created:", response);
  } catch (error) {
    console.error("Error creating enquiry:", error);
  }
};

createEnquiryRow({
  name: "Samuel",
  jobTitle: "SDE",
  company: "XYZ",
  email: "fsdafd",
  message: "fjasdlkfjsdl",
})
  .then(console.log)
  .catch(console.error);
