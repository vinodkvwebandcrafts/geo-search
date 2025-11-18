import { AnyObj } from "./types";
import { getImageAltText } from "./getImageAltText";
import { getImageUrl } from "./getImageUrl";

export function getImage(img ?: AnyObj | null) {
    if (!img) return null;
    return {
        url: getImageUrl(img),
        alternative_text: getImageAltText(img),
        width: img.width ?? null,
        height: img.height ?? null,
    };
}