export const state = () => ({
  vmrCategory: [],
})

export const actions = {
  async fetchVmrCategory({ commit }) {
    const params = new URLSearchParams()

    try {
      const response = await this.$axios.$get('/categories', {
        params,
      })
      await commit('setVmrCategory', response)
    } catch (e) {}
  },
}

export const mutations = {
  setVmrCategory(state, value) {
    state.vmrCategory = value.data
  },
}

export const getters = {
  getVmrCategory: (state) => {
    return state.vmrCategory
  },
  getIdBySlug: (state) => (slug) => {
    const vmrCat = state.vmrCategory.find((e) => e.slug === slug)
    return vmrCat.id
  },
}
