/**
 * general-site-setting service
 */

import { factories } from '@strapi/strapi';
import moment from 'moment';
import xml from 'xml';
import fs from 'fs';
import path from 'path';
import { getFrontendFullURL } from '../../../helpers/getFrontendFullURL';

const generalSitenapFilename = 'sitemap.xml';

export default factories.createCoreService('api::general-site-setting.general-site-setting', ({ strapi }) => ({
    async sitemapGenerator(ctx) {
        try {
            const docs = await strapi.documents('api::url-mapper.url-mapper').findMany({
                filters: {
                    slug: {
                        $ne: null
                    }
                }
            });
            let urls = [];   
            docs && docs?.length != 0 && docs?.map((doc: any) => {
                if (!doc && doc?.slug) return;
                if(doc?.slug as string) {
                    urls?.push({
                        // <url>
                        url: [
                            // <loc>http://www.example.com/</loc>
                            {
                                loc: getFrontendFullURL(doc?.slug),
                            },
                            // <lastmod>2005-01-01</lastmod>
                            { lastmod: moment(doc?.updatedAt).format("YYYY-MM-DDTHH:mm:ssZ") },
                        ],
                    });
                }
            });
            let generateDataXML = {
                urlset: [
                    {
                        _attr: {
                            xmlns: "https://www.sitemaps.org/schemas/sitemap/0.9",
                        },
                    },
                    ...urls,
                ],
            };

            const xmlString = xml(generateDataXML);

            const dir = path.join(process.cwd(), "public", "sitemap");

            await fs.promises.mkdir(dir, { recursive: true });

            await fs.promises.writeFile(
                path.join(dir, generalSitenapFilename),
                '<?xml version="1.0" encoding="UTF-8"?>' + xmlString
            );

            return getFrontendFullURL(generalSitenapFilename);

        } catch (error) {
            console.log('Sitemap generation error:', error);
        }
    }
}));
