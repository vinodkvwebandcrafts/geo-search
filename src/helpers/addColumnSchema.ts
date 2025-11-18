import { Core } from '@strapi/strapi';

export default async function addColumnSchema(strapi: Core.Strapi) {
  const schema = {
    type: 'boolean',
    default: true,
  };

  const columnName = 'enable_component';

  const updateComponentList: string[] = [
    "common.content-area",
    "home.banner",
    "home.our-services",
    "home.featured-promotions",
    "home.buying-guide",
    "home.advantages",
    "home.money-exchange",
    "home.faq",
    "home.reviews",
    "home.our-presence",
    "home.contact",
    "about.banner",
    "about.our-impact",
    "about.our-team",
    "about.advantages",
    "about.missionvision",
    "about.core-values",
    "about.leadership-team",
    "career.banner",
    "career.highlights",
    "career.our-team",
    "career.current-openings",
    "career.card",
    "faq.faq-listing",
    "insights.related-insights",
    "insights.slider",
    "insights.recent-insights",
    "static-page.static-page-banner",
    "static-page.content-area",
    "static-page.content-area-with-box",
    "services.banner",
    "services.definition",
    "services.why-choose",
  ];

  for (const key in strapi.components) {
    const component = strapi.components[key];
    if (updateComponentList.includes(component?.uid)) {
      component.attributes[columnName] = schema;
      if (component.__schema__?.attributes) {
        component.__schema__.attributes[columnName] = schema;
      }
    }
  }
}
