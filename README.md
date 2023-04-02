# OuterMeasure Website

This project was written in [Next.js](https://nextjs.org), project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

The articles data is pulled from Notion via Notion Integrations. As of this writing,
an internal integration is used.

1. Open [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
   with your browser.
2. Login to your account
3. Click on "Create new integration"
4. Give your integration a name.
5. You do not have to specify a logo.
6. Under "Associated workspace" make sure you select the workspace within which
   your pages exist.
7. The website only reads the data from Notion. Therefore, unselect "Read content"
   and "Update content" in "Content Capabilities" section.
8. Leave "Comment Capabilities" empty.
9. Under "User Capabilities", select "No user information".
10. Click on Submit. This will create an internal integration on Notion and
    redirect you to "Review and edit integration" screen.
11. Copy the "Internal Integration Token". This is basically the API key that will
    be passed to Notion.
12. Go back to your workspace and create a "root" page.
13. You need to now link the "root" page with the Notion integration that was created earlier. You can do this by opening the page and clicking on the "..." button on the top right corner. Then `Add connections > Search <YOUR_INTEGRATION_NAME>`.
14. Now create subpages under the "root" page that you want to view on the website.
15. Copy the page ID from
    the URL of your browser. The page ID is a 36 alphanumeric segement at the
    end of the URL.
16. In your local repository, create ".env.local" in the repo root with the following entries:

```
NOTION_API_KEY=...
ROOT_PAGE_ID=...
```

17. All the articles are located at `http://localhost:3000/articles/<slug>`.
    You can see the output of the NextJS server to see all the slugs that were
    loaded.

Run the following commands to start the dev server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
website.