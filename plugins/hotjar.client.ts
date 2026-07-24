export default defineNuxtPlugin(() => {
  if (process.dev) return

  const loadHotjar = () => {
    if (document.getElementById('hotjar-script')) return

    const script = document.createElement('script')
    script.id = 'hotjar-script'
    script.async = true
    script.text = `
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:6419037,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `
    document.head.appendChild(script)
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(loadHotjar, { timeout: 4000 })
  } else {
    setTimeout(loadHotjar, 3000)
  }
})
