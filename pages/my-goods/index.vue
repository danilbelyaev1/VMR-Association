<template>
  <main class="content my-product">
    <BreadCrumbs />
    <section class="marketplace">
      <div class="container">
        <div class="marketplace-wrapper">
          <h2>Мои товары</h2>
          <div class="marketplace-inputs row">
            <div class="col-12">
              <my-button
                text="Добавить товар"
                class="btn btn-primary"
                :disabled="false"
                @click="$router.push('/my-goods/add-offer')"
              />
            </div>
          </div>
          <OfferList
            v-if="!$fetchState.pending"
            :offers="offers"
            :meta="offersMeta"
            short-card
            @paginate="$fetch"
          >
            <!-- TODO реализовать -->
            <template v-if="false" #head>
              <div class="radio-section">
                <input
                  id="radio-op"
                  checked
                  type="radio"
                  name="radio-filter"
                  class="radio"
                />
                <label for="radio-op">Открытые</label>
                <input
                  id="radio-ar"
                  type="radio"
                  name="radio-filter"
                  class="radio"
                />
                <label for="radio-ar">Архив</label>
              </div>
            </template>
            <template #not-found-title>
              <h4>У вас нет товаров.</h4>
            </template>
          </OfferList>
          <div v-else>Загрузка...</div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'MyGoodsPage',

  fetchOnServer: false,

  middleware: 'auth',

  async fetch() {
    const page = this.$route.query?.page || 1

    await this.$store.dispatch('catalog/fetchOffers', { page, myOffers: true })
  },

  computed: {
    offers() {
      return this.$store.state.catalog.offers.list
    },
    offersMeta() {
      return this.$store.state.catalog.offers.meta
    },
  },

  methods: {},
}
</script>

<style scoped></style>
