import { AnyObj } from "./types";
import { baseUrl } from "./variables";

export function getImageUrl(img ?: AnyObj | null) {
    return img ? `${baseUrl}${img.url ?? ""}` : null;
}