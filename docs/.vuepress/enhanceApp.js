export default ({ router }) => {
  if (typeof window === 'undefined') return

  router.afterEach((to) => {
    // homepage-only layout class; clear when leaving so other pages keep VuePress padding
    if (to.path === '/' || to.path === '/index.html') {
      document.documentElement.classList.add('hh-page')
    } else {
      document.documentElement.classList.remove('hh-page')
    }
  })
}
