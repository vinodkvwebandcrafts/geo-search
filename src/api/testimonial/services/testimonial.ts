/**
 * testimonial service
 */

import { factories } from '@strapi/strapi';
import { getReviews } from '../../../utilities/getReviews';

export default factories.createCoreService('api::testimonial.testimonial', ({strapi})=>({
    async getReviews(ctx) {
        return await getReviews();
        ctx.send({
            message: 'reviews'
        })
    }
}));
