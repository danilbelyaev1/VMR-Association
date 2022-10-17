import { VIEW_COLUMN, VIEW_ROW } from '~/helpers/view'

export const state = () => ({
  offers: {
    list: [],
    meta: {},
  },
  products: {
    list: [],
  },
  companies: {
    list: [],
  },
  units: {
    list: [],
  },
  view: VIEW_COLUMN,
})

export const getters = {
  offersCount: (state) => {
    return state.offers.meta?.total || 0
  },
  findUnitById: (state) => (id) => {
    return state.units.list.find((entity) => entity.id === id) || null
  },
  findProductById: (state) => (id) => {
    return state.products.list.find((entity) => entity.id === id) || null
  },
  findCompanyById: (state) => (id) => {
    return state.companies.list.find((entity) => entity.id === id) || null
  },
  isRowView: (state) => state.view === VIEW_ROW,
  isColumnView: (state) => state.view === VIEW_COLUMN,
  getLastOffers: (state) => {
    return state.offers?.list?.slice(0, 6)
  },
}

export const actions = {
  async fetchOffers({ commit }, { page = 1, myOffers = false, limit = 10 }) {
    // todo в дальнейшем метод будет переделан, пока так
    const url = myOffers ? '/profile/offers' : '/offers'
    try {
      const response = await this.$axios.$get(url, {
        params: { page, include: 'image', limit },
      })
      await commit('setOfferList', response.data)
      await commit('setOfferMeta', response.meta)
      await commit('setProductList', response.products || [])
      await commit('setCompaniesList', response.companies || [])
      await commit('setUnitList', response.units || [])
    } catch (e) {}
  },
  async fetchOffersWithFilter(
    { commit },
    { page = 1, myOffers = false, filter }
  ) {
    const url = myOffers ? '/profile/offers' : '/offers'

    const params = new URLSearchParams()
    params.append('filter[in_stock]', '1')
    params.append('filter[region_id]', filter.region_id || '')
    params.append('filter[type]', filter.type || '')
    params.append('filter[product_id]', filter.product_id || '')
    params.append('filter[company_id]', filter.company_id || '')
    params.append('filter[price]', filter.price || '')
    params.append('filter[rating]', filter.rating || '')
    params.append('filter[impurity_percent]', filter.impurity_percent || '')
    params.append('filter[date]', filter.date || '')

    params.append('page', page)
    params.append('include', 'image')

    try {
      const response = await this.$axios.$get(url, {
        params,
      })

      await commit('setOfferList', response.data)
      await commit('setOfferMeta', response.meta)
      await commit('setProductList', response.products || [])
      await commit('setCompaniesList', response.companies || [])
      await commit('setUnitList', response.units || [])
    } catch (e) {}
  },
}

export const mutations = {
  setOfferList(state, value) {
    state.offers.list = value
  },
  setOfferMeta(state, value) {
    state.offers.meta = value
  },
  setProductList(state, value) {
    state.products.list = value
  },
  setCompaniesList(state, value) {
    state.companies.list = value
  },
  setUnitList(state, value) {
    state.units.list = value
  },
  changeViewToRow(state) {
    state.view = VIEW_ROW
  },
  changeViewToColumn(state) {
    state.view = VIEW_COLUMN
  },
}
