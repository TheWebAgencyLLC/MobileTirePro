export function scheduleWhenIdle(callback: () => void, options?: { timeout?: number }) {
  const timeout = options?.timeout ?? 3000

  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(callback, { timeout })
  } else {
    setTimeout(callback, Math.min(timeout, 2000))
  }
}

export function loadScriptOnce(
  src: string,
  dataAttribute: string,
  onLoad?: () => void,
  appendTo: 'head' | 'body' = 'body'
): boolean {
  const existingScript = document.querySelector(`script[data-${dataAttribute}]`)
  if (existingScript) {
    onLoad?.()
    return false
  }

  const script = document.createElement('script')
  script.src = src
  script.async = true
  script.setAttribute(`data-${dataAttribute}`, 'true')
  if (onLoad) {
    script.onload = onLoad
  }
  document[appendTo].appendChild(script)
  return true
}

export function waitForDomContent(
  container: HTMLElement,
  options?: { timeout?: number; minChildren?: number }
): Promise<void> {
  const timeout = options?.timeout ?? 8000
  const minChildren = options?.minChildren ?? 1

  if (container.childElementCount >= minChildren) {
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    let settled = false

    const finish = () => {
      if (settled) return
      settled = true
      observer.disconnect()
      clearTimeout(timer)
      resolve()
    }

    const observer = new MutationObserver(() => {
      if (container.childElementCount >= minChildren) {
        finish()
      }
    })

    observer.observe(container, { childList: true, subtree: true })

    const timer = setTimeout(finish, timeout)
  })
}
