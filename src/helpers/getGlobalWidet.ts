import { AnyObj } from "./types";

export async function getGlobalWidget(query: AnyObj | null) {
    if (!query) return null;

    return await strapi.db.query('api::global-component.global-component').findOne({
      where: {
        publishedAt: {
          $notNull: true
        }
      },
      ...query,
    })
}