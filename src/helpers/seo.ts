import url from "url";
import { Core } from "@strapi/strapi";
import { MetaSocial, SEOComponent, SEOInput, SeoService } from "./interface";
import { frontEndUrl } from "./variables";
import { getNextGenerateUrl } from "./getNextGenerateUrl";
import { checkImageExist } from "./checkImageExist";
import getGeneralData from "./getGeneralData";

export default function seo(strapi: Core.Strapi): SeoService {
  async function seoStructure(seo: SEOInput): Promise<SEOComponent> {

    const generalData = await getGeneralData();

    const imgNxtUrl = getNextGenerateUrl(seo?.metaImage ?? generalData?.og?.ogImage);

    if(seo?.metaSocial?.length === 0 && generalData?.meta_social?.length){
      seo.metaSocial = generalData?.meta_social;
    }

    const metaSocial: MetaSocial[] = seo?.metaSocial?.map((element) => {
      const img = element?.image ? checkImageExist(element.image) : null;
      return {
        id: element?.id ?? null,
        socialNetwork: element?.socialNetwork ?? null,
        title: element?.title ?? null,
        description: element?.description ?? null,
        link: element?.link ?? null,
        image: {
          url: img?.url ?? null,
          alternativeText: element?.image?.alternativeText ?? `Social Share Image for ${element?.socialNetwork}`,
        },
      };
    }) || [];

    const seoComponent: SEOComponent = {
      id: seo?.id ?? null,
      metaTitle: seo?.metaTitle ?? null,
      metaDescription: seo?.metaDescription ?? null,
      keywords: seo?.keywords ?? null,
      metaRobots: seo?.metaRobots ?? null,
      structuredData: seo?.structuredData ?? null,
      metaViewport: seo?.metaViewport ?? null,
      canonicalURL: seo?.canonicalURL ?? null,
      metaImage: {
        url: url.resolve(frontEndUrl, imgNxtUrl ?? "") ?? null,
        alternativeText: seo?.metaImage?.alternativeText ?? "Luluforx Website Meta Image",
      },
      metaSocial: metaSocial ?? [],
    };

    return seoComponent;
  }

  return { seoStructure };
}