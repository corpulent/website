import { Client } from "@notionhq/client";

// Initializing a client
const notion = new Client({
  auth: "secret_frsciTWcNEAOn4xuMmIaJGk9mezm5834BTK3lHwAcz8",
});

export const getPages = async (pageId: string) => {
  const result = await notion.blocks.children.list({
    block_id: pageId,
  });
  return result;
};

export const getPage = async (pageId: string) => {
  const [blocks, page] = await Promise.all([
    notion.blocks.children.list({ block_id: pageId }),
    notion.pages.retrieve({ page_id: pageId }),
  ]);
  return { blocks, page };
};
