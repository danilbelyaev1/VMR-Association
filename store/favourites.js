import { VIEW_COLUMN, VIEW_ROW } from '~/helpers/view'

export const state = () => ({
  favourites: {
    indexes: [],
    offers: {
      list: [],
      meta: {},
    },
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

export const actions = {
  async fetchFavouritesOffers({ commit, state }, { page = 1 }) {
    const url = '/offers'

    const params = new URLSearchParams()
    params.append('filter[in_stock]', '1')
    params.append('filter[id]', state.favourites.indexes)

    params.append('page', page)
    params.append('include', 'image')

    if (state.favourites.indexes.length) {
      try {
        const response = await this.$axios.$get(url, {
          params,
        })

        const serverFavourites = response?.data.map(({ id }) => id)

        await commit('setFavouritesIndexes', serverFavourites || [])
        await commit('setFavouritesOffers', response?.data || [])
        await commit('setFavouritesMeta', response?.meta || {})
        await commit('setFavouritesProductList', response?.products || [])
        await commit('setFavouritesCompaniesList', response?.companies || [])
        await commit('setFavouritesUnitList', response?.units || [])
      } catch (e) {}
    }
  },
  async loadInitialFavourites({ commit, state }, auth) {
    const favourites = await JSON.parse(
      localStorage.getItem('favourites') || '[]'
    )
    await commit('setInitialFavourites', favourites)
    if (auth) {
      try {
        const response = await this.$axios.$get('/favorites/offers')
        const serverFavourites = response?.data
          .filter((offer) => offer.company.id !== this.$auth.user.company.id)
          .map((e) => {
            return e.id
          })
        const favouritesIdx = state.favourites.indexes

        for (const e of serverFavourites) {
          if (!favouritesIdx.includes(e)) {
            await commit('toggleFavourites', e)
          }
        }
        for (const e of favouritesIdx) {
          if (!serverFavourites.includes(e)) {
            const url = `/offers/${e}/favorite`
            try {
              await this.$axios.$post(url)
            } catch (error) {
              await commit('toggleFavourites', e)
            }
          }
        }
      } catch (e) {}
    }
  },
  async toggleFavourites({ commit }, { favourite, auth }) {
    if (auth) {
      try {
        const url = `/offers/${favourite?.id}/favorite`
        await this.$axios.$post(url)
      } catch (e) {}
    }
    await commit('toggleFavourites', favourite)
  },
  async removeFavouritesOnLogOut({ commit }) {
    await commit('setInitialFavourites', [])
    await commit('setFavouritesOffers', [])
    await localStorage.removeItem('favourites')
  },
}

export const mutations = {
  setInitialFavourites(state, value) {
    state.favourites.indexes = value
  },
  setFavouritesIndexes(state, value) {
    state.favourites.indexes = value
    localStorage.setItem('favourites', JSON.stringify(value))
  },
  toggleFavourites(state, value) {
    const favouriteId = value?.id || value
    const index = state.favourites.indexes.findIndex((e) => {
      return e === favouriteId
    })
    if (index === -1) {
      state.favourites.indexes.push(favouriteId)
    } else {
      state.favourites.indexes.splice(index, 1)
      state.favourites.offers.list = state.favourites.offers.list.filter(
        (e) => {
          return e.id !== favouriteId
        }
      )
    }
    localStorage.setItem('favourites', JSON.stringify(state.favourites.indexes))
  },
  setFavouritesOffers(state, value) {
    state.favourites.offers.list = value
  },
  setFavouritesMeta(state, value) {
    state.favourites.offers.meta = value
  },
  setFavouritesProductList(state, value) {
    state.products.list = value
  },
  setFavouritesCompaniesList(state, value) {
    state.companies.list = value
  },
  setFavouritesUnitList(state, value) {
    state.units.list = value
  },
  changeViewToRow(state) {
    state.view = VIEW_ROW
  },
  changeViewToColumn(state) {
    state.view = VIEW_COLUMN
  },
}

export const getters = {
  isInFavourites: (state) => (id) => {
    return state.favourites.indexes.find((entity) => entity === id) || null
  },
  getFavoritesIndexes: (state) => {
    return state.favourites.indexes || []
  },
  getFavourites: (state) => {
    return state.favourites.offers.list || 0
  },
  getFavouritesOffersCount: (state) => {
    return state.favourites.offers.list.length || 0
  },
  getFavouritesCount: (state) => {
    return state.favourites.indexes.length
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
}
