export async function createOrGetFolders(folderName: string) {
    if (!folderName) throw new Error("folderName is required");
    const existingFolder = await strapi.db
        .query("plugin::upload.folder")
        .findOne({ where: { name: { $eq: folderName } } });

    if (existingFolder) return existingFolder;

    const newFolderData = await strapi.db
        .query("plugin::upload.folder")
        .create({ data: { name: folderName } });

    return strapi.db.query("plugin::upload.folder").update({
        where: { id: newFolderData.id },
        data: {
            path: `/${newFolderData.id}`,
            pathId: newFolderData.id,
        },
    });
}