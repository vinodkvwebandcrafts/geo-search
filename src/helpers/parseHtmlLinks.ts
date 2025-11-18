import { parse as parseHtml } from "node-html-parser";
import { baseUrl } from "./variables";

export async function parseHtmlLinks(contents: string | null) {
    if (!contents) return null;
    try {
        const htmlObj = parseHtml(contents);

        htmlObj.getElementsByTagName("img").forEach((tag) => {
            tag.setAttribute("src", tag.getAttribute("src") ?? "");
            tag.removeAttribute("srcset");
        });

        htmlObj.getElementsByTagName("video").forEach((tag) => {
            tag.setAttribute("src", tag.getAttribute("src") ?? "");
        });

        htmlObj.getElementsByTagName("a").forEach((aTag) => {
            const aUrl = aTag.getAttribute("href");
            if (!aUrl) return;

            try {
                // absolute URL detection
                const parsed = new URL(aUrl, baseUrl);
                const absolute = parsed.toString();

                if (absolute.startsWith(baseUrl)) {
                    // convert to path-only relative URL
                    const newUrl = parsed.pathname.replace(/^\/+/, ""); // remove leading /
                    aTag.setAttribute("href", newUrl);
                } else {
                    // external link -> open in new tab
                    aTag.setAttribute("target", "_blank");
                }
            } catch {
                // malformed or relative URL — leave as-is
            }
        });

        htmlObj.querySelectorAll(".upload-url").forEach((file) => {
            const aUrl = file.getAttribute("href");
            if (aUrl) {
                file.setAttribute("href", baseUrl + aUrl);
            }
        });

        return htmlObj.toString();
    } catch (error) {
        strapi.log.error("parseHtmlLinks error:", error);
        return null;
    }
}