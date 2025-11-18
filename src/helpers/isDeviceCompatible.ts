import { Widget } from "./interface";

export function isDeviceCompatible(widget: Widget, requestDevice: string | undefined): boolean {
  if (!requestDevice || widget?.device === undefined || widget?.device === null) {
    return true;
  }
  if (requestDevice === "mobile" && widget.device === "desktop only") {
    return false;
  }
  if (requestDevice === "desktop" && widget.device === "mobile only") {
    return false;
  }
  return true;
}