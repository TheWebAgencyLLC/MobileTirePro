import { SITE } from './site'

export const schemaConfig = {
    script: [
        {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": SITE.name,
            "url": SITE.url,
            "logo": SITE.logo,
            "email": SITE.email,
            "telephone": SITE.phone,
            "sameAs": [
              "https://www.facebook.com/profile.php?id=61560018959670",
              "https://www.instagram.com/prolinewheelandtire",
              "https://www.youtube.com/@ProlineWheelAndTire",
              "https://www.tiktok.com/@prolinewheelandtire"
            ]
        })
        }
    ]
}
