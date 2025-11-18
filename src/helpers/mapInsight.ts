import { formatDate } from "./formatDate";
import { getImage } from "./getImage";

// Helper: map an insight item to the frontend shape
export const mapInsight = (item: any, fallbackIndex: number) => ({
  id: item?.id ?? fallbackIndex + 1,
  slug: item?.slug ?? null,
  url: item?.url ?? null,
  title: item?.title ?? null,
  duration: item?.duration ?? null,
  date: formatDate(item?.date) ?? null,
  category: item?.insight_category?.title ?? null,
  image: item?.image ? getImage(item.image) : null,
});