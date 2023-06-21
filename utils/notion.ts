import { Client } from "@notionhq/client";
import slugify from "slugify";
import { GetPageResponse } from "@notionhq/client/build/src/api-endpoints";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

let cachedPages: any = null;
let cachedPageMetas: any = null;

export const getPages = async (pageId: string) => {
  if (cachedPages) {
    return cachedPages;
  }

  const result = await notion.blocks.children.list({
    block_id: pageId,
  });

  cachedPages = result;

  return result;
};

const getPageMetas = async (pages: any): Promise<any> => {
  if (cachedPageMetas) {
    return cachedPageMetas;
  }
  const pageMetas = await Promise.all(
    pages.results.map((page: any) =>
      notion.pages.retrieve({ page_id: page.id })
    )
  );

  cachedPageMetas = pageMetas;

  return pageMetas;
};

export const getSlugs = async (rootPageId: string): Promise<string[]> => {
  const pages = await getPages(rootPageId);
  const pageMetas = await getPageMetas(pages);

  return pageMetas.map((pageMeta: any) =>
    slugify((pageMeta as any).properties.title.title[0].plain_text, {
      replacement: "-",
      lower: true,
      trim: true,
    })
  );
};

let blocksBySlug: Record<string, any> = {};

export const getAllPages = async (rootPageId: string) => {
  if (Object.keys(blocksBySlug).length > 0) {
    return blocksBySlug;
  }

  const pages = await getPages(rootPageId);
  const pageMetas = await getPageMetas(pages);

  const blocksList = await Promise.all(
    pageMetas.map((pageMeta: any) =>
      notion.blocks.children.list({
        block_id: pageMeta.id,
      })
    )
  );

  blocksBySlug = Object.fromEntries(
    pageMetas.map((pageMeta: any, index: number) => [
      slugify((pageMeta as any).properties.title.title[0].plain_text, {
        replacement: "-",
        lower: true,
        trim: true,
      }),
      { blocks: blocksList[index], meta: pageMetas[index] },
    ])
  );

  return blocksBySlug;
};

export const getPage = async (rootPageId: string, slug: string) => {
  const pages = await getPages(rootPageId);
  const pageMetas = await getPageMetas(pages);

  const pageMetaBySlug: Record<string, GetPageResponse> = Object.fromEntries(
    pageMetas.map((pageMeta: any) => [
      slugify((pageMeta as any).properties.title.title[0].plain_text, {
        replacement: "-",
        lower: true,
        trim: true,
      }),
      pageMeta,
    ])
  );

  if (!(slug in pageMetaBySlug)) {
    throw new Error(
      `Cannot find page with slug "${slug}"! Valid slugs are as follows:\n${JSON.stringify(
        Object.keys(pageMetaBySlug),
        null,
        4
      )}`
    );
  }

  const blocks =
    blocksBySlug[slug]?.blocks ??
    (await notion.blocks.children.list({
      block_id: pageMetaBySlug[slug].id,
    }));
  return { blocks, page: pageMetaBySlug[slug] };
};

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
      parent: { database_id: process.env.NOTION_DATABASE_ID! },
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
