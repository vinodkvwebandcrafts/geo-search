import { Widget } from "./interface";

export function isWidgetEnabled(widget: Widget): boolean {
  return widget?.enable_component !== false;
}
