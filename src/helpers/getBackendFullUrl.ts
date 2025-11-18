import url from "url";
import { baseUrl } from "./variables";

export function getBackendFullUrl(path: string) {
    if (!path) return null;
    return url.resolve(baseUrl, path);
}