export const GTM_ID = 'GTM-MB6KB9CS'

// Standard GTM head snippet — required for Tag Assistant / GTM Preview (vue-gtm loadScript alone breaks preview).
export const gtmConfig = {
  script: [
    {
      key: 'gtm-datalayer',
      innerHTML:
        "window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});",
    },
    {
      key: 'gtm-js',
      src: `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`,
      async: true,
    },
  ],
  noscript: [
    {
      key: 'gtm-noscript',
      innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      tagPosition: 'bodyOpen' as const,
    },
  ],
}
