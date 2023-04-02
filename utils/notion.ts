import { Client } from "@notionhq/client";
import slugify from "slugify";
import { GetPageResponse } from "@notionhq/client/build/src/api-endpoints";

// Initializing a client
const notion = new Client({
  auth: "secret_frsciTWcNEAOn4xuMmIaJGk9mezm5834BTK3lHwAcz8",
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

  const blocks = await notion.blocks.children.list({
    block_id: pageMetaBySlug[slug].id,
  });
  return { blocks, page: pageMetaBySlug[slug] };
};
