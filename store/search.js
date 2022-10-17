export const state = () => ({
  searchText: '',
  offers: [],
  offerRecommendations: [],
})

export const actions = {
  async setSearchText({ commit }, text) {
    await commit('setSearchText', text)
  },
  async setOffersCommonData({ commit }, response) {
    await commit('catalog/setOfferMeta', response.meta, { root: true })
    await commit('catalog/setProductList', response.products || [], {
      root: true,
    })
    await commit('catalog/setCompaniesList', response.companies || [], {
      root: true,
    })
    await commit('catalog/setUnitList', response.units || [], { root: true })
  },
  async searchOffers({ commit, dispatch, getters }, { text, page }) {
    try {
      const url = '/offers'

      const params = new URLSearchParams()
      params.append('include', 'image')
      params.append('filter[search]', text)
      params.append('page', page)
      const response = await this.$axios.$get(url, { params })

      await commit('setOffers', response?.data || [])
      if (getters.getOffersCount) {
        await dispatch('setOffersCommonData', response)
      } else {
        await dispatch('fetchOfferRecommendations')
      }
    } catch (e) {}
  },
  async fetchOfferRecommendations({ commit, dispatch }) {
    try {
      const response = await this.$axios.$get('/recommendation/offers')
      await commit('setOfferRecommendations', response?.data || [])
      await dispatch('setOffersCommonData', response)
    } catch (e) {}
  },
}

export const mutations = {
  setSearchText(state, value) {
    state.searchText = value
  },
  setOffers(state, value) {
    state.offers = value
  },
  setOfferRecommendations(state, value) {
    state.offerRecommendations = value
  },
}

export const getters = {
  getOffersCount: (state) => {
    return state.offers.length || 0
  },
  getOfferRecommendationsCount: (state) => {
    return state.offerRecommendations.length || 0
  },
}
