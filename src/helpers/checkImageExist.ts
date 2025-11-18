import url from "url";
import { AnyObj } from "./types";
import { baseUrl } from "./variables";

export function checkImageExist(img?: AnyObj | null) {
    const mimeType = typeof img?.mime === "string" ? img.mime.split("/")[0] : null;
    const resolvedUrl = (() => {
        try {
            // if img.url is absolute already, URL will handle it
            return url.resolve(baseUrl, img.url).toString();
        } catch {
            return `${baseUrl}${img.url ?? ""}`;
        }
    })();

    return {
        id: img.id,
        type: mimeType,
        url: resolvedUrl,
        alternativeText: img?.alternativeText ?? "A featured image for this section",
    };
}