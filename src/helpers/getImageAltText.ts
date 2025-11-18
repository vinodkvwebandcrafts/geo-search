import { AnyObj } from "./types";

export function getImageAltText(img?: AnyObj | null) {
    return img?.alternativeText ?? "A featured image for this section";
}