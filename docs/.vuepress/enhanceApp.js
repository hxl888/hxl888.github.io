export default ({ router }) => {
  if (typeof window === 'undefined') return

  // VuePress forces target=_blank on external nav links; keep same-tab like homepage CTAs
  const sameTabNav = () => {
    document.querySelectorAll('.nav-links a.external[target="_blank"]').forEach((a) => {
      a.removeAttribute('target')
      a.removeAttribute('rel')
    })
  }

  router.afterEach((to) => {
    // homepage-only layout class; clear when leaving so other pages keep VuePress padding
    if (to.path === '/' || to.path === '/index.html') {
      document.documentElement.classList.add('hh-page')
    } else {
      document.documentElement.classList.remove('hh-page')
    }
    sameTabNav()
  })
}
