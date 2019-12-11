import axios from 'axios'
import cookies from 'js-cookie'
import cookie from 'cookie'
import { setAuthToken, resetAuthToken } from '~/plugins/auth'

export const state = () => ({
  user: null,
  snackbar: {
    shown: false,
    color: '',
    timeout: 5000,
    text: ''
  }
})
export const mutations = {
  set_user(store, data) {
    store.user = data
  },
  reset_user(store) {
    store.user = null
  },
  toast(state, payload) {
    state.snackbar.shown = true
    state.snackbar.color = payload.color
    state.snackbar.text = payload.message
    const self = this
    setTimeout(() => {
      self.commit('closeSnackBar')
    }, state.snackbar.timeout)
  },
  closeSnackBar(state) {
    state.snackbar.shown = false
  }
}
export const actions = {
  nuxtServerInit({ dispatch }, context) {
    return new Promise((resolve, reject) => {
      const cookies = cookie.parse(context.req.headers.cookie || '')
      if (cookies.hasOwnProperty('token')) {
        setAuthToken(cookies.token)
        dispatch('fetchUser')
          .then(() => {
            resolve(true)
          })
          .catch(() => {
            resetAuthToken()
            resolve(false)
          })
      } else {
        resetAuthToken()
        resolve(false)
      }
    })
  },
  fetchUser({ commit }) {
    return axios({
      method: 'get',
      url: 'api/me'
    })
      .then((response) => {
        commit('set_user', response.data)
        return response
      })
      .catch((error) => {
        commit('reset_user')
        return error
      })
  },
  login({ commit }, data) {
    return axios({
      data,
      method: 'post',
      url: 'login'
    }).then((response) => {
      commit('set_user', response.data.user)
      setAuthToken(response.data.token)
      cookies.set('token', response.data.token, { expires: 14 })
      return response
    })
  },
  logout({ commit }) {
    commit('reset_user')
    resetAuthToken()
    cookies.remove('token')
    return Promise.resolve()
  }
}
