export const IMAGE_QUERY = {
    fields: [
        "url",
        "alternativeText",
        "width",
        "height",
        "caption",
        "size",
        "mime",
        "id",
    ],
};
export const SINGLE_TYPE = "singleType";
export const COLLECTION_TYPE = "collectionType";
export const URL_SUFFIXES = {
    EXPERIENCE: "experiences/",
};
export const baseUrl = process.env.APP_URL ?? "";
export const frontEndUrl = process.env.FRONTEND_URL ?? "";
export const imgNxtUrl = process.env.FRONTEND_URL ?? "";
export const seoPopulate = {
    seo: {
        populate:{
            metaImage: true,
            openGraph: {
                populate: {
                    ogImage: true,
                }
            },
            metaSocial: {
                populate: {
                    image: true,
                },
            },
        }
    }
}
export const sliderPopulate = {
    insights: {
        populate: {
            insight_category: true,
            image: true,
            share: {
                populate: {
                    follow: {
                        populate: {
                            icon: true,
                        }
                    }
                }
            }
        }
    }
}
export const dummyReviews = {
  html_attributions: [],
  result: {
    name: "Example Coffee Shop",
    rating: 4.5,
    user_ratings_total: 127,
    reviews: [
      {
        author_name: "John Doe",
        author_url: "https://www.google.com/maps/contrib/123456789/",
        language: "en",
        profile_photo_url: "https://lh3.googleusercontent.com/a-/AOh14Gi...",
        rating: 5,
        relative_time_description: "a month ago",
        text: "Great place for coffee and snacks!",
        time: 1697000400
      },
      {
        author_name: "Jane Smith",
        rating: 4,
        relative_time_description: "2 months ago",
        text: "Good service but a bit crowded.",
        time: 1694318400
      }
    ]
  },
  status: "OK"
}