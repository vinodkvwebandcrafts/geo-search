export function getBackendBaseUrl() {
    let url = process.env.APP_URL ?? "";
    return url.endsWith("/") ? url.slice(0, -1) : url;
}