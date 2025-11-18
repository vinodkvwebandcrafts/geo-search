import { getBackendFullUrl } from "../src/helpers/getBackendFullUrl";

export default {
  sitemapGenerate: {
    task: async ({ strapi }) => {
        try {
            console.log("Running Sitemap Generator");
            const url = getBackendFullUrl('/api/sitemap/generate')
            await fetch(url);
            console.log("Sitemap Generated");
        } catch (error) {
          strapi.log.error("Sitemap generation error:", error);
        }
    },
    options: {
      rule: "0 0 * * * *",
    },
  },
};