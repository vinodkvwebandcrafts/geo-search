import { AnyObj } from "./types";
import { baseUrl } from "./variables";

export function checkFileExist(file?: AnyObj | null) {
  if (!file) return "";
  return { url: baseUrl + (file.url ?? "") };
}