export const getInsights = async (pinnedInsights, category = null) => {

    const pinnedIds = pinnedInsights?.map((item: any) => item?.id) ?? [];
    const limit = pinnedInsights?.length >= 4 ? 4 : 4 - pinnedInsights?.length;

    console.log('Pinned insights', pinnedInsights?.length)

    let insights = [];

    if(limit > 0) {
        insights = await strapi.db.query("api::insight.insight").findMany({
            where: {
                publishedAt: {
                    $notNull: true
                },
                $and: [
                    {
                        id: {
                            $notIn: pinnedIds
                        }
                    },
                    {
                        insight_category: category ? {
                            slug: category
                        } : {}
                    }
                ]
            },
            orderBy: { publishedAt: 'desc' },
            limit: limit,
            populate: {
                image: true,
                insight_category: true
            }
        });
    }

    if(!insights) {
        console.log('Unpinned insights not found')
    }

    let allInsights = [];

    if(insights?.length > 0) {
        allInsights = [...pinnedInsights, ...insights];
    } else {
        allInsights = [...pinnedInsights]
    }


    return allInsights;

}