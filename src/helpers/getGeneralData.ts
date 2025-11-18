export default async function getGeneralData() {
    const data = strapi.documents('api::general-site-setting.general-site-setting').findFirst({
        status: 'published',
        populate: {
            og: {
                populate: {
                    ogImage: true,
                }
            },
            meta_social: {
                populate: {
                    image: true
                }
            }
        }
    })
    if (!data) {
        return null;
    }
    return data;
}