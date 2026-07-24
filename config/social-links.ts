export interface SocialLink {
  name: string
  href: string
  icon: 'facebook' | 'youtube' | 'tiktok' | 'instagram'
}

export const socialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61560018959670',
    icon: 'facebook',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/prolinewheelandtire',
    icon: 'instagram',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@ProlineWheelAndTire',
    icon: 'youtube',
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@prolinewheelandtire',
    icon: 'tiktok',
  },
]
