import { GetPageDataOptions } from "./interface";

export async function getPageData({ uid, query = {}, whereQuery = {} }: GetPageDataOptions) {
    const queryEntity = strapi.db.query(uid);

    const data = await queryEntity.findOne({
      ...query,
      ...whereQuery,
    });

    if (!data) {
      return null;
    }

    return data;
  }