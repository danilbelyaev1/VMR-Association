<template>
  <main class="content">
    <BreadCrumbs />
    <section class="marketplace">
      <div class="container">
        <div class="marketplace-wrapper">
          <h2>Маркетплэйс</h2>
          <CatalogFilter @filter-change="change" />

          <OfferList
            v-if="!$fetchState.pending"
            :offers="offers"
            :meta="offersMeta"
            @paginate="$fetch"
          >
            <template #head>
              <div v-if="offersCount" class="text-2">
                Всего результатов: <span class="h6" v-text="offersCount" />
              </div>
            </template>
            <template #body>
              <div class="number-of-offers">
                Количество предложений:
                <my-select
                  v-model="perPage"
                  :show-empty="false"
                  :options="perPages"
                />
              </div>
            </template>

            <template #not-found-title>
              <h4>Нет товаров, совпадающих с вашим запросом.</h4>
            </template>
            <!-- TODO реализовать -->
            <template v-if="false" #not-found-wrap>
              <h6>Пожалуйста, измените настройки фильтра:</h6>
              <h6 class="refilter">Рейтинг производителя: <span>от 4</span></h6>
              <h6 class="refilter">
                Вид ВМР: <span>ПЭТ прозрачный голубой</span>
              </h6>
              <h3>Возможно, вас заинтересует</h3>
              <div class="marketplace-catalog">
                <div class="row">
                  <div class="col-3"></div>
                </div>
              </div>
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
    <client-only>
      <DefaultModal
        modal-class="get-prices-modal"
        close-button-text="Понятно"
        modal-id="noYourOwnCompany"
        title="Этот товар уже ваш"
        text="Вы не можите купить товар который и так принадлежит вам"
      />
    </client-only>
  </main>
</template>

<script>
import { debounce } from 'lodash'
import OfferList from '@/components/catalog/OfferList'

export default {
  name: 'CatalogPage',

  components: { OfferList },

  fetchOnServer: false,

  data() {
    return {
      filter: {},
      perPages: [12, 24, 60].map((i) => ({ id: i, name: i })),
      perPage: { id: 12, name: 12 },
    }
  },

  async fetch() {
    const page = this.$route.query?.page || 1
    const limit = this.perPage.id

    await this.$store.dispatch('catalog/fetchOffers', { page, limit })
  },

  computed: {
    offers() {
      return this.$store.state.catalog.offers.list
    },
    offersCount() {
      return this.$store.getters['catalog/offersCount']
    },
    offersMeta() {
      return this.$store.state.catalog.offers.meta
    },
  },
  watch: {
    perPage(value) {
      this.$route.query.page = 1
      this.$fetch()
    },
  },
  created() {
    this.debouncedFilterChange = debounce(this.filterChange, 300)
  },
  methods: {
    change() {
      this.debouncedFilterChange()
    },
    async filterChange() {
      this.filter = this.$store.getters['filter/getFilter']

      const page = this.$route.query?.page || 1

      await this.$store.dispatch('catalog/fetchOffersWithFilter', {
        page,
        filter: this.filter,
      })
    },
  },
}
</script>

<style scoped></style>
