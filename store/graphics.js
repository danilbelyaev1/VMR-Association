export const state = () => ({
  totalStock: [],
  products: {},
  productIds: [],
  productDeals: [],
})

export const actions = {
  async fetchTotalStocks({ commit }, productIds) {
    try {
      const response = await this.$axios.$get('/graphics/total-stocks', {
        params: { productIds },
      })
      await commit('setTotalStocks', response)
    } catch (e) {}
  },
  async fetchProducts({ commit }, { productIds, period }) {
    try {
      const response = await this.$axios.$get('/graphics/products', {
        params: { productIds, period },
      })
      await commit('setProductsByDay', response)
    } catch (e) {}
  },
  async fetchProductDeals({ commit }, { productId }) {
    try {
      const response = await this.$axios.$get(
        `/graphics/product-deals/${productId}`
      )
      await commit('setProductDeals', response)
    } catch (e) {}
  },
  async loadInitialProductIds({ commit }) {
    const productIds = await JSON.parse(
      localStorage.getItem('graphics_products') || '[]'
    )
    commit('setInitialProductIds', productIds)
  },
}

export const mutations = {
  setTotalStocks(state, value) {
    state.totalStock = value.data
  },
  setProductsByDay(state, value) {
    state.products = value
  },
  setProductDeals(state, value) {
    state.productDeals = value
  },
  setInitialProductIds(state, value) {
    state.productIds = value
  },
}

export const getters = {
  getTotalStockLabels: (state) => {
    return state.totalStock.map((product) => product.name)
  },
  getTotalStockValues: (state) => {
    return state.totalStock.map((product) => product.total_stocks)
  },
}
