import { Widget } from "./interface";
import mappings from "./mappings";

export function getDefinitionKey(widget: Widget): string | undefined {
  return mappings[widget?.__component];
}