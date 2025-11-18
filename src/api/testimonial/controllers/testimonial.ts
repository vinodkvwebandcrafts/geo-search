/**
 * testimonial controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::testimonial.testimonial', ({strapi})=>({
    async find(ctx) {
        return await strapi.service('api::testimonial.testimonial').getReviews(ctx);
    }
}));
