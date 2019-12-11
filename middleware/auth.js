export default function({ store, redirect, route }) {
  const isLoggedIn = !!store.state.user
  const urlRequiresAuth = /^\/dashboard(\/|$)/.test(route.fullPath)
  const urlRequiresNoAuth = route.fullPath === '/'
  if (isLoggedIn && urlRequiresNoAuth) {
    return redirect('/dashboard')
  }
  if (!isLoggedIn && urlRequiresAuth) {
    return redirect('/')
  }
  return Promise.resolve()
}
