import axios from "axios";

export async function getReviews() {
    const apiKey = process.env.GOOGLE_API_KEY!;
    const placeId = process.env.GOOGLE_PLACE_ID!;

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;

    try {
      const { data } = await axios.get(url);

      return data

      if (!data.result?.reviews) return [];

      return data.result.reviews.map((r: any) => ({
        author_name: r.author_name,
        rating: r.rating,
        text: r.text,
        time: r.time,
        profile_photo_url: r.profile_photo_url,
      }));
    } catch (err: any) {
      strapi.log.error("Google Review Fetch Error:", err.message);
      throw new Error("Failed to fetch Google reviews");
    }
}