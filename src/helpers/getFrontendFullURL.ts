import url from "url";

export function getFrontendFullURL(path: string) {
    if (!path) {
        return null;
    }
    let frontend_url = process.env.FRONTEND_URL ?? "";
    if (!frontend_url) {
        return path;
    }
    let formatedUrl = frontend_url.endsWith("/") ? frontend_url.slice(0, -1) : frontend_url;
    return url.resolve(formatedUrl, path);
}