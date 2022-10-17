<template>
  <main class="content cart">
    <BreadCrumbs />
    <section class="marketplace">
      <div class="container">
        <div class="marketplace-wrapper">
          <h2>Корзина</h2>
          <div v-if="!$fetchState.pending">
            <div v-if="cart.length">
              <div
                v-for="dial in cart"
                :key="dial.id"
                class="marketplace-catalog-wrapper"
              >
                <div class="marketplace-catalog-titles">
                  <h4>{{ dial.seller.name || dial.seller.short_name }}</h4>
                </div>
                <div class="marketplace-catalog catalog-row">
                  <div class="row">
                    <div
                      v-for="item in dial.items"
                      :key="item.id"
                      class="col-3"
                    >
                      <CartItem :item="item" />
                    </div>
                  </div>
                </div>
                <div class="marketplace-catalog-titles bottom">
                  <h5>
                    Сумма заказа: <span>{{ dial.total_price }} ₽</span>
                  </h5>
                  <my-button
                    class="btn btn-primary"
                    text="Оформить заказ"
                    @click="createDial(dial)"
                  />
                </div>
              </div>
            </div>
            <div v-else class="marketplace-catalog-wrapper">
              <h4>В корзине ничего нет</h4>
            </div>
          </div>
          <div
            v-else
            class="d-flex align-content-center justify-content-center"
          >
            <div class="loader-wrap">
              <span class="loader"></span>
              <div class="loader-circle"></div>
            </div>
          </div>
        </div>
      </div>
      <DealOnlyForLoginUser />
    </section>
  </main>
</template>

<script>
export default {
  name: 'CartPage',
  fetchOnServer: false,

  data() {
    return {}
  },

  async fetch() {
    try {
      await this.$store.dispatch('cart/loadInitialCart', this.isAuth)
      await this.$store.dispatch('cart/loadCart', this.isAuth)
    } catch (e) {}
  },
  computed: {
    isAuth() {
      return Boolean(this.$auth.user)
    },
    cart() {
      return this.$store.getters['cart/getCart']
    },
  },
  methods: {
    remove() {
      // this.fetch()
    },
    async createDial(dial) {
      if (!this.isAuth) {
        this.$bvModal.show('deal-only-for-login-user')
      }
      try {
        const url = `/deals`
        const data = {
          cart_offer_ids: [
            ...dial.items.map((item) => {
              return item.id
            }),
          ],
        }
        const dealOffersId = dial.items.map((e) => {
          return e.offer.id
        })
        const response = await this.$axios.$post(url, data)
        if (response) {
          const dealId = response.data.id
          await this.$store.dispatch('cart/removeFromCart', {
            offersID: dealOffersId,
            auth: this.isAuth,
            createDeal: true,
          })
          await this.$router.push({
            path: `/cart/${dealId}`,
            params: { uuid: dealId },
          })
        }
      } catch (e) {}
    },
  },
}
</script>

<style scoped></style>
