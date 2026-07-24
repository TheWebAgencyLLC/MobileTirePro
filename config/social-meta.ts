import { SITE } from './site'

export const socialMetaConfig = {
    meta: [
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE.url}/` },
      { property: "og:title", content: `Mobile Tire & Wheel Service | ${SITE.name}` },
      {
        property: "og:description",
        content: `${SITE.name}: Expert mobile tire installation and wheel services for sedans, SUVs, trucks, and EVs. We come to you for convenient on-site service.`
      },
      { property: "og:image", content: SITE.ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${SITE.name} logo` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: `${SITE.url}/` },
      { name: "twitter:title", content: `Mobile Tire Installation | ${SITE.name}` },
      {
        name: "twitter:description",
        content: `${SITE.name}: Expert mobile tire installation and wheel services for sedans, SUVs, trucks, and EVs. We come to you for convenient on-site service.`
      },
      { name: "twitter:image", content: SITE.ogImage }
    ]
}
