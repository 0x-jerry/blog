export function loadingIndicator() {
  const rootEl = document.createElement('div')
  rootEl.classList.add('loading-indicator')

  let visible = 0
  
  document.body.append(rootEl)

  return {
    rootEl,
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
