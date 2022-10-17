export const state = () => ({
  news: {
    list: [],
    meta: {},
  },
  events: {
    list: [],
    meta: {},
  },
  recommendations: [],
})

export const actions = {
  async fetchNews(
    { commit, dispatch },
    { page = 1, type = 1, searchText = '' }
  ) {
    const params = new URLSearchParams()
    params.append('filter[type]', type)
    params.append('filter[search]', searchText)
    if (searchText) {
      params.append('limit', 16)
    }
    params.append('page', page)
    try {
      const response = await this.$axios.$get('/news', {
        params,
      })

      if (!response.data.length) {
        await dispatch('fetchRecommendations', { type })
      }

      if (type === 1) {
        await commit('setNews', response.data)
        await commit('setNewsMeta', response.meta)
      } else {
        await commit('setEvents', response.data)
        await commit('setEventsMeta', response.meta)
      }
    } catch (e) {}
  },
  async fetchRecommendations({ commit }, { type = '1' }) {
    const params = new URLSearchParams()
    params.append('filter[type]', type)
    params.append('limit', 4)
    params.append('random', 1)

    try {
      const response = await this.$axios.$get('/news', { params })
      await commit('setRecommendations', response.data)
    } catch (e) {}
  },
}

export const mutations = {
  setNews(state, value) {
    state.news.list = value
  },
  setNewsMeta(state, value) {
    state.news.meta = value
  },
  setEvents(state, value) {
    state.events.list = value
  },
  setEventsMeta(state, value) {
    state.events.meta = value
  },
  setRecommendations(state, value) {
    state.recommendations = value
  },
}

export const getters = {
  getNewsSeeAlso: (state) => {
    return state.news?.list?.slice(0, 5)
  },
  getEventsSeeAlso: (state) => {
    return state.events?.list?.slice(0, 5)
  },
  getEvents: (state) => {
    return state.events?.list || []
  },
  getNews: (state) => {
    return state.news?.list || []
  },
}
