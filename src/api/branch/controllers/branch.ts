/**
 * branch controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::branch.branch', ({ strapi }) => ({
  async find(ctx) {
    return await strapi.service('api::branch.branch').getAllBranches(ctx);
  },
  async findOne(ctx) {
    return await strapi.service('api::branch.branch').getBranchDetails(ctx);
  }
}));
