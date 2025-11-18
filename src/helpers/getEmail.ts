import { AnyObj } from "./types";

export async function getEmail(query: AnyObj | null) {
    if (!query) {
      console.log('query is null');
      return null;
    };

    return await strapi.db.query('api::email.email').findOne({
      where: {
        publishedAt: {
          $notNull: true
        }
      },
      ...query,
    })
}