import { SITE } from './site'

export const metaConfig = {
    title: `Mobile Tire & Wheel Service in Chicagoland | ${SITE.name}`,
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'apple-touch-icon', href: '/images/logos/ProlineLogo-header.webp' },
      { rel: 'canonical', href: `${SITE.url}/` }
    ],
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      {
        name: "description",
        content: `${SITE.name}: Expert mobile tire installation and wheel services for sedans, SUVs, trucks, and EVs. We come to you for convenient on-site tire fitting and TPMS service. Book online or call for professional service at your location.`
      },
      {
        name: "keywords",
        content: "Mobile tire installation,On-site tire service,Wheel and tire,TPMS service,At-home tire installation,EV tire service,Proline Wheel and Tire,Mobile tire service Chicagoland"
      },
      {
        name: "google-site-verification",
        content: "UwNalKyI61RDCZ59ntTfla1980vsAzOLiMJ87hh9nS0"
      }
    ]
}
