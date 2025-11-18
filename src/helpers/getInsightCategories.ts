export const getInsightCategories = async () => {
    return await strapi.db.query("api::insight-category.insight-category").findMany({
        where: {
            publishedAt: {
                $notNull: true
            }
        }
    })
}