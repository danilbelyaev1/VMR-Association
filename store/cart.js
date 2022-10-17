export const state = () => ({
  local: [],
  server: [],
  cart: [],
  units: {
    list: [],
  },
})

export const actions = {
  async loadUnits({ commit }) {
    try {
      const response = await this.$axios.$get('/units')
      await commit('setUnits', response?.data || [])
    } catch (e) {}
  },
  async loadInitialCart({ commit, state, dispatch }, auth) {
    const local = await JSON.parse(localStorage.getItem('cart') || '[]')
    await commit('setLocal', local)
    await dispatch('loadUnits')
    if (auth) {
      try {
        const response = await this.$axios.$get('/cart')
        await commit('setServer', response.data)

        const server = []
        response?.data.map((dial) => {
          return dial.items.map((item) => {
            server.push({ offer_id: item.offer.id, quantity: item.quantity })
            return { offer_id: item.offer.id, quantity: item.quantity }
          })
        })
        console.log('serverCart: ', server)
        const local = state.local
        console.log('localCart: ', local)

        const serverOfferIdx = server.map((e) => {
          return e.offer_id
        })
        const localOfferIxd = local.map((e) => {
          return e.offer_id
        })
        console.log('serverOfferIdx: ', serverOfferIdx)
        console.log('localOfferIxd: ', localOfferIxd)

        // for (const id of serverOfferIdx) {
        //   if (!localOfferIxd.includes(id)) {
        //     const cartOffer = server.find((e) => {return e.offer_id === id})
        //     console.log("server-to-local diff :", cartOffer)
        //     await commit("addToLocalCart", {offerID: cartOffer.offer_id, quantity: cartOffer.quantity })
        //   }
        // }

        for (const id of localOfferIxd) {
          if (!serverOfferIdx.includes(id)) {
            const url = `/cart/add`
            const cartOffer = local.find((e) => {
              return e.offer_id === id
            })
            try {
              await this.$axios.$post(url, cartOffer)
              console.log('local-to-server diff posted :', cartOffer)
            } catch (e) {
              console.log('local-to-server diff falled:', cartOffer)
            }
          }
        }
        await commit('clearLocalCart')
      } catch (e) {
        console.log('error: ', e)
      }
    }
  },
  async loadCart({ commit, state }, auth) {
    if (auth) {
      const url = '/cart'
      try {
        const response = await this.$axios.$get(url)
        await commit('setCart', response?.data || [])
      } catch (e) {}
    } else {
      const items = state.local

      if (items.length === 0) {
        await commit('setCart', [])
        return
      }

      const url = '/cart/instance'
      try {
        const response = await this.$axios.$post(url, { items })
        await commit('setCart', response?.data || [])
      } catch (e) {}
    }
  },
  async addToCart({ commit, dispatch }, { offerID, quantity, auth }) {
    if (auth) {
      try {
        const url = `/cart/add`
        const data = {
          offer_id: offerID,
          quantity,
        }
        const response = await this.$axios.$post(url, data)
        await commit('setCart', response?.data || [])
      } catch (e) {}
    } else {
      await commit('addToLocalCart', { offerID, quantity })
      await dispatch('loadCart', auth)
    }
  },
  async removeFromCart(
    { commit, dispatch },
    { offersID, auth, createDeal = false }
  ) {
    console.log('offerID on remove: ', offersID)
    if (auth && !createDeal) {
      const url = '/cart/remove'
      const data = {
        offers: [],
      }
      data.offers.push(offersID)
      const response = await this.$axios.$post(url, data)
      console.log('offerID on remove: ', offersID)
      console.log('after remove: ', response)
    } else {
      await commit('removeFromLocalCart', offersID)
    }
    await dispatch('loadCart', Boolean(this.$auth.user))
  },
}

export const mutations = {
  setCart(state, value) {
    state.cart = value
  },
  setLocal(state, value) {
    state.local = value
  },
  setServer(state, value) {
    state.server = value
  },
  addToLocalCart(state, { offerID, quantity }) {
    const index = state.local.findIndex((e) => {
      return e.offer_id === offerID
    })
    if (index === -1) {
      state.local.push({ offer_id: offerID, quantity })
    } else {
      state.local[index].quantity += quantity
    }
    localStorage.setItem('cart', JSON.stringify(state.local))
  },
  clearLocalCart(state) {
    state.local = []
    localStorage.removeItem('cart')
  },
  setCartToDefault(state) {
    state.local = []
    state.server = []
    state.cart = []
    state.units.list = []
  },
  removeFromLocalCart(state, value) {
    let offersId = []
    if (Array.isArray(value)) {
      offersId = [...value]
    } else {
      offersId.push(value)
    }
    state.local = state.local.filter((e) => {
      return !offersId.includes(e.offer_id)
    })
    localStorage.setItem('cart', JSON.stringify(state.local))
  },
  setUnits(state, value) {
    state.units.list = value
  },
}

export const getters = {
  getCart: (state) => {
    return state.cart || []
  },
  isInFavourites: (state) => (id) => {
    return state.favourites.indexes.find((entity) => entity === id) || null
  },
  getLocalCart: (state) => {
    return state.local || []
  },
  getCartCount: (state) => {
    return state.cart.length || 0
  },
  getAuthCartCount: (state) => {
    return state.cart.reduce(function (count, current) {
      return count + current?.items.length
    }, 0)
  },
  getLocalCartCount: (state) => {
    return state.local.length || 0
  },
  findUnitById: (state) => (id) => {
    return state.units.list.find((entity) => entity.id === id) || null
  },
  isInCart: (state) => (id, isAuth) => {
    if (isAuth) {
      let findId = false
      for (const items of state.cart) {
        items.items.map((entity) => {
          if (entity.offer.id === id) {
            findId = true
          }
          return findId
        })
      }
      return findId
    }
    return Boolean(state.local.find((entity) => entity.offer_id === id))
  },
}
