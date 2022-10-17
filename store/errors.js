export const state = () => ({
  serverError: {
    isExists: false,
    status: 200,
    message: '',
    showModal: false,
  },
})

export const actions = {
  async serverError({ commit }, { status, message, showModal }) {
    await commit('setServerError', { status, message, showModal })
  },
}

export const mutations = {
  setServerError(state, { status, message, showModal }) {
    state.serverError.isExists = true
    state.serverError.status = status
    state.serverError.message = message
    state.serverError.showModal = showModal
  },
  setNoServerError(state) {
    state.serverError.isExists = true
    state.serverError.showModal = false
    state.serverError.message = ''
    state.serverError.status = 200
  },
}

export const getters = {
  getServerError: (state) => {
    return state.serverError
  },
  getShowErrorModal: (state) => {
    return state.serverError.isExists && state.serverError.showModal
  },
}
