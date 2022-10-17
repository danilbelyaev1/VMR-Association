export const state = () => ({
  regions: {
    list: [],
    selected: null,
  },
  products: {
    list: [],
    selected: null,
  },
  companies: {
    list: [],
    selected: null,
  },
  impurity_percentage: {
    list: [
      { id: 0, name: '0%' },
      { id: 1, name: '1%' },
      { id: 2, name: '2%' },
      { id: 3, name: '3%' },
      { id: 4, name: '4%' },
      { id: 5, name: '5%' },
      { id: 6, name: '6%' },
      { id: 7, name: '7%' },
      { id: 8, name: '8%' },
      { id: 9, name: '9%' },
      { id: 10, name: '10%' },
    ],
    selected: [],
  },
  price: {
    min: 0,
    max: 5000,
    selected: {
      min: 0,
      max: 5000,
    },
  },
  type: {
    list: [
      { id: 1, name: 'Реалтайм' },
      { id: 2, name: 'Фьючерс' },
    ],
    selected: null,
  },
  month: '',
  rating: {
    min: 0,
    max: 5,
  },
  sale_from: {},
})

export const actions = {
  async fetchRegions({ commit }) {
    const params = new URLSearchParams()
    params.append('filter[has_offers]', '1')
    params.append('limit', '100')
    try {
      const response = await this.$axios.$get('/regions', {
        params,
      })
      await commit('setRegions', response.data)
    } catch (e) {}
  },

  async fetchProducts({ commit }) {
    try {
      const response = await this.$axios.$get('/products')
      await commit('setProducts', response.data)
    } catch (e) {}
  },

  async fetchCompanies({ commit }) {
    try {
      const response = await this.$axios.$get('/companies')
      await commit('setCompanies', response.data)
    } catch (e) {}
  },

  async fetchPricesAndImpurityPercentage({ commit }) {
    try {
      const response = await this.$axios.$get('/filters/data')
      await commit('setPrices', response.data.prices)
      await commit('setImpurityPercentage', response.data.impurity_percent)
      await commit('setSaleFrom', response.data)
      console.log(response)
    } catch (e) {}
  },
}

export const mutations = {
  setPrices(state, value) {
    state.price.max = value.max
    state.price.min = value.min
    state.price.selected.max = value.max
    state.price.selected.min = value.min
  },
  setImpurityPercentage(state, value) {
    state.impurity_percentage.list = value
  },
  setRegions(state, value) {
    state.regions.list = value
  },
  setProducts(state, value) {
    state.products.list = value
  },
  setCompanies(state, value) {
    state.companies.list = value
  },
  setSaleFrom(state, value) {
    state.sale_from = value
  },
  setSelectedRegion(state, value) {
    if (value === -1) {
      state.regions.selected = null
      return
    }
    state.regions.selected = value
  },
  setSelectedProduct(state, value) {
    if (value === -1) {
      state.products.selected = null
      return
    }
    state.products.selected = value
  },
  setSelectedCompany(state, value) {
    if (value === -1) {
      state.companies.selected = null
      return
    }
    state.companies.selected = value
  },
  setSelectedImpurityPercentage(state, value) {
    if (state.impurity_percentage.selected.includes(value)) {
      state.impurity_percentage.selected =
        state.impurity_percentage.selected.filter(function (e) {
          return e !== value
        })
      return
    }
    state.impurity_percentage.selected.push(value)
  },
  setSelectedType(state, value) {
    if (value === -1) {
      state.type.selected = null
      return
    }
    state.type.selected = value
  },
  setRating(state, value) {
    state.rating.min = value[0]
    state.rating.max = value[1]
    console.log(value)
  },
  setSelectedPrice(state, value) {
    state.price.selected.min = value[0]
    state.price.selected.max = value[1]
  },
  setMonth(state, value) {
    state.month = value
  },
  reset(state) {
    state.regions.selected = null
    state.products.selected = null
    state.companies.selected = null
    state.type.selected = null
    state.impurity_percentage.selected = []
    state.price.selected.min = state.price.min
    state.price.selected.max = state.price.max
    state.month = ''
    state.rating.min = 0
    state.rating.max = 5
    state.sale_from = {}
  },
}

export const getters = {
  getRegions: (state) => {
    return state.regions.list
  },
  getProducts: (state) => {
    return state.products.list
  },
  getCompanies: (state) => {
    return state.companies.list
  },
  getImpurityPercentage: (state) => {
    return state.impurity_percentage.list
  },
  getType: (state) => {
    return state.type.list
  },
  getPrices: (state) => {
    return {
      min: state.price.min,
      max: state.price.max,
    }
  },
  getFilter: (state) => {
    return {
      type: state.type.selected,
      region_id: state.regions.selected,
      product_id: state.products.selected,
      company_id: state.companies.selected,
      price: [state.price.selected.min, state.price.selected.max],
      date: state.month,
      impurity_percent: state.impurity_percentage.selected,
      rating: [state.rating.min, state.rating.max],
    }
  },
}
