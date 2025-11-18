import { Widget } from "./interface";
import { getImage } from "./getImage";
import { getGlobalWidget } from "./getGlobalWidet";
import { dummyReviews } from "./variables";

// Helper: standard widget creator
const createWidget = (widget_type: string, data: any, widget: Widget) => ({
  widget_type,
  data,
  component: widget?.__component ?? null,
});

export default {
  contentArea: async (widget: Widget) =>
    createWidget("ContentAreaWidget", { content: widget?.content }, widget),

};