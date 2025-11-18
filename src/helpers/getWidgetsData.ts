"use strict";

import definitions from "./definitions";
import { ParamObj } from "./interface";
import { checkComponentsExist } from "./checkComponentsExist";
import { isWidgetEnabled } from "./isWidgetEnabled";
import { isDeviceCompatible } from "./isDeviceCompatible";
import { Definitions } from "./types";
import { getDefinitionKey } from "./getDefinitionKey";

export async function getWidgetsData(paramObj: ParamObj): Promise<any[] | null> {
  const widgets = paramObj?.widgets;
  checkComponentsExist(widgets?.map((data) => data?.__component));

  if (!widgets || widgets.length <= 0) {
    return null;
  }

  let requestDevice = strapi.requestContext.get().request.headers["device"];
  if (Array.isArray(requestDevice)) {
    requestDevice = requestDevice[0];
  }
  const structuredWidgets: any[] = [];
  const cloneDefinition: Definitions = { ...definitions };

  for (const widget of widgets) {
    try {
      if (
        !isWidgetEnabled(widget) ||
        !isDeviceCompatible(widget, requestDevice)
      ) {
        continue;
      }

      const definitionKey = getDefinitionKey(widget);
      if (!definitionKey || !cloneDefinition[definitionKey]) {
        continue;
      }

      const structuredWidget = await cloneDefinition[definitionKey](
        widget,
        paramObj?.pageData
      );
      structuredWidgets.push(structuredWidget);
    } catch (err) {
      console.error("Error in getWidgetsData:", err);
    }
  }

  return structuredWidgets;
};
