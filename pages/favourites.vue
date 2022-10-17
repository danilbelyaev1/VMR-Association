<template>
  <main class="content">
    <BreadCrumbs />
    <section class="marketplace">
      <div class="container">
        <div class="marketplace-wrapper">
          <h2>Избранное</h2>

          <OfferList
            v-if="!$fetchState.pending"
            :offers="offers"
            :meta="offersMeta"
            @paginate="$fetch"
          >
            <template #head>
              <div v-if="offersCount" class="text-2">
                Всего результатов: <span class="h6">{{ offersCount }}</span>
              </div>
            </template>
            <template #not-found-title>
              <h4>Нет избранных товаров.</h4>
            </template>
          </OfferList>

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
    </section>
  </main>
</template>

<script>
import OfferList from '@/components/catalog/OfferList'

export default {
  name: 'FavouritesPage',

  components: { OfferList },

  fetchOnServer: false,

  data() {
    return {}
  },

  async fetch() {
    const page = this.$route.query?.page || 1
    await this.$store.dispatch('favourites/loadInitialFavourites', this.isAuth)
    await this.$store.dispatch('favourites/fetchFavouritesOffers', { page })
  },
  computed: {
    offers() {
      return this.$store.getters['favourites/getFavourites']
    },
    offersCount() {
      return this.$store.getters['favourites/getFavouritesOffersCount']
    },
    offersMeta() {
      return this.$store.state.favourites.favourites.offers.meta
    },
    favouritesIndexes() {
      return this.$store.getters['favourites/getFavoritesIndexes']
    },
  },
  async mounted() {},
  methods: {},
}
</script>

<style scoped></style>
