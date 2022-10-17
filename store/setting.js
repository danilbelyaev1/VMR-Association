export const state = () => ({
  setting: [],
})

export const actions = {
  async fetchSetting({ commit }) {
    try {
      const response = await this.$axios.$get('/settings')
      await commit('setSetting', response)
    } catch (e) {}
  },
}

export const mutations = {
  setSetting(state, value) {
    state.setting = value.data
  },
}

export const getters = {
  getSetting: (state) => {
    return state.setting
  },
  getSettingByKey: (state) => (key) => {
    return state.setting?.find((e) => e.key === key) || ''
  },
  isEnableESignature: (state, getters) => {
    return getters.getSettingByKey('enable_e_signature')?.value === '1'
  },
}
