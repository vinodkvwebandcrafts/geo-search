import { AnyObj } from "./types";
import { baseUrl } from "./variables";

export function checkImageExistArray(imgArray?: AnyObj[] | null) {
    if (!Array.isArray(imgArray) || imgArray.length === 0) return "";
    return imgArray.map((element) => ({
        url: baseUrl + (element?.url ?? ""),
        alternativeText: element?.alternativeText,
        width: element?.width,
        height: element?.height,
        caption: element?.caption,
    }));
}