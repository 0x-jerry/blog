export function loadingIndicator() {
  if (import.meta.env.SSR) {
    return {
      show: () => {},
      hide: () => {},
    }
  }

  const rootEl = document.createElement('div')
  rootEl.classList.add('loading-indicator')

  let visible = 0

  document.body.append(rootEl)

  return {
    show,
    hide,
  }

  function show() {
    visible++
    rootEl.classList.add('is-visible')
  }

  function hide() {
    visible--

    if (visible <= 0) {
      visible = 0
    }

    rootEl.classList.remove('is-visible')
  }
}
