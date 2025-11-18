/**
 * general-site-setting controller
 */

import { factories, UID } from '@strapi/strapi'

export default factories.createCoreController('api::general-site-setting.general-site-setting', ({ strapi }) => ({
    async sitemapGenerator(ctx) {
        return await strapi.service('api::general-site-setting.general-site-setting').sitemapGenerator(ctx);
    },
    async getAllData(ctx) {
        let res = [];
        let uids = Object.keys(strapi.contentTypes).filter(uid =>
            uid.startsWith('api::')
        )
        for(let uid of uids) {
            console.log('uid', uid)
            const data = await strapi.db.query(uid as UID.ContentType).findMany({
                where: {
                    publishedAt: {
                        $not: null
                    }
                },
                populate: {
                    '*': true,
                    widget: {
                        populate: {
                            '*': true
                        }
                    }
                },
            })
            res.push({
                uid: uid,
                data: data ?? []
            });
        }
        return res;
    }
}));
