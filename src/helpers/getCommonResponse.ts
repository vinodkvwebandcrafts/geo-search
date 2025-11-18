import { getWidgetsData } from "./getWidgetsData";
import { CommonResponse } from "./interface";
import seo from "./seo";

export async function getCommonResponse(data: any): Promise<CommonResponse> {
    const allWidgets = await getWidgetsData({
      widgets: data?.widgets,
      pageData: data,
    });

    let seoData = {};
    if(data?.seo) {
      seoData = await seo(strapi).seoStructure(data?.seo);
    }

    const response: CommonResponse = {
      data: {
        seo: seoData,
      },
    };

    if (allWidgets?.length > 0) {
      response.data.widgets = allWidgets;
    }

    return response;
  }