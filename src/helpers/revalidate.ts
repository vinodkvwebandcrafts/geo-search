import getGeneralData from "./getGeneralData";

export default async function revalidateUrl() {

    const data = await getGeneralData();
    const url = process.env.REVALIDATE_URL;

    try {
        if (!data?.revalidate_url && !url) {
            console.error('No revalidate url found');
            return;
        }
        const revalidate = await fetch(data?.revalidate_url ?? url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log('revalidate status code:', revalidate.status)
    } catch (err) {
        console.error('Error revalidating url', err);
    }
}