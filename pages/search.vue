<template>
  <main class="content">
    <BreadCrumbs />
    <section class="marketplace">
      <div class="container">
        <div class="marketplace-wrapper">
          <h2>Результаты поиска</h2>

          <div class="position-relative">
            <input
              id="marketplace-search"
              v-model="searchInput"
              type="text"
              autocomplete="false"
              @input="debouncedSearch"
              @keypress.enter="search"
            />
            <label for="marketplace-search">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 15.192L4.31543 10.8766C3.27841 9.63164 2.76128 8.03479 2.87162 6.41826C2.98197 4.80173 3.71128 3.28997 4.90786 2.19747C6.10444 1.10497 7.67615 0.515845 9.29602 0.552652C10.9159 0.589458 12.4592 1.24936 13.6049 2.39508C14.7507 3.5408 15.4106 5.08413 15.4474 6.70401C15.4842 8.32388 14.8951 9.89559 13.8026 11.0922C12.7101 12.2887 11.1983 13.0181 9.58177 13.1284C7.96524 13.2388 6.36839 12.7216 5.12343 11.6846L0.808 16L0 15.192ZM14.2857 6.85717C14.2857 5.84001 13.9841 4.84569 13.419 3.99996C12.8539 3.15422 12.0507 2.49504 11.1109 2.10579C10.1712 1.71654 9.13715 1.6147 8.13954 1.81314C7.14192 2.01157 6.22555 2.50138 5.50631 3.22062C4.78707 3.93987 4.29726 4.85624 4.09882 5.85385C3.90038 6.85147 4.00222 7.88553 4.39148 8.82526C4.78073 9.76499 5.4399 10.5682 6.28564 11.1333C7.13138 11.6984 8.1257 12 9.14286 12C10.5064 11.9985 11.8136 11.4562 12.7777 10.4921C13.7419 9.52791 14.2842 8.22068 14.2857 6.85717Z"
                  fill="white"
                />
              </svg>
            </label>
          </div>

          <div class="radio-section mt-4">
            <input
              id="radio-ar"
              v-model="searchType"
              value="offers"
              type="radio"
              name="radio-filter"
              class="radio"
            />
            <label for="radio-ar">Товары</label>
            <input
              id="radio-news"
              v-model="searchType"
              value="news"
              type="radio"
              name="radio-filter"
              class="radio"
            />
            <label for="radio-news">Новости</label>
            <input
              id="radio-events"
              v-model="searchType"
              value="events"
              type="radio"
              name="radio-filter"
              class="radio"
            />
            <label for="radio-events">Мероприятия</label>
          </div>

          <div v-if="!$fetchState.pending">
            <OfferList
              v-if="showOffers"
              :offers="offers"
              :meta="offersMeta"
              @paginate="$fetch"
            >
              <template #head>
                <h4 v-if="offersCount">Товары</h4>
              </template>
              <template #not-found-title>
                <h4>Нет товаров, совпадающих с вашим запросом.</h4>
              </template>
              <template #not-found-wrap>
                <h3>Возможно, вас заинтересует</h3>
                <div class="marketplace-catalog">
                  <div class="row">
                    <div
                      v-for="offer in offerRecommendations"
                      :key="offer.id"
                      class="col-3"
                    >
                      <OfferCard :offer="offer" />
                    </div>
                  </div>
                </div>
              </template>
            </OfferList>

            <div v-if="showNews" class="mt-3 news event">
              <template v-if="news.length">
                <h4>Новости</h4>
                <div class="row">
                  <EventsItem
                    v-for="event in news"
                    :key="event.id"
                    :event-item="event"
                    :type="1"
                    class="col-3"
                  />
                  <Pagination :meta="newsMeta" @paginate="$fetch" />
                </div>
              </template>

              <EventsRecommendation v-else :event-type="1">
                <h4>Нет новостей, совпадающих с вашим запросом.</h4>
              </EventsRecommendation>
            </div>

            <div v-if="showEvents" class="mt-3 news event">
              <template v-if="events.length">
                <h4>Мероприятия</h4>
                <div class="row">
                  <EventsItem
                    v-for="event in events"
                    :key="event.id"
                    :event-item="event"
                    :type="2"
                    class="col-3"
                  />
                  <Pagination :meta="eventsMeta" @paginate="$fetch" />
                </div>
              </template>

              <EventsRecommendation v-else :event-type="2">
                <h4>Нет мероприятий, совпадающих с вашим запросом.</h4>
              </EventsRecommendation>
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
    </section>
  </main>
</template>

<script>
import OfferList from '@/components/catalog/OfferList'
import SearchMixin from '~/components/mixins/SearchMixin'

export default {
  name: 'SearchPage',

  components: { OfferList },

  mixins: [SearchMixin],

  fetchOnServer: false,

  beforeRouteUpdate(from, to, next) {
    this.$fetch()
    next()
  },

  beforeRouteLeave(from, to, next) {
    this.$store.dispatch('search/setSearchText', '')
    next()
  },

  data() {
    return {
      searchType: 'offers',
    }
  },

  async fetch() {
    if (this.showOffers) {
      await this.fetchOffers()
    } else if (this.showNews) {
      await this.fetchNews()
    } else if (this.showEvents) {
      await this.fetchEvents()
    }
  },
  computed: {
    showOffers() {
      return this.searchType === 'offers'
    },
    showEvents() {
      return this.searchType === 'events'
    },
    showNews() {
      return this.searchType === 'news'
    },
    offers() {
      return this.$store.state.search.offers
    },
    offersCount() {
      return this.$store.getters['search/getOffersCount']
    },
    offerRecommendations() {
      return this.$store.state.search.offerRecommendations
    },
    offerRecommendationsCount() {
      return this.$store.getters['search/getOfferRecommendationsCount']
    },
    offersMeta() {
      return this.$store.state.catalog.offers.meta
    },
    news() {
      return this.$store.state.news.news.list
    },
    newsMeta() {
      return this.$store.state.news.news.meta
    },
    events() {
      return this.$store.state.news.events.list
    },
    eventsMeta() {
      return this.$store.state.news.events.meta
    },
    newsRecommendations() {
      return this.$store.state.news.recommendations
    },
  },
  watch: {
    searchType(v) {
      this.$route.query.page = 1
      this.$fetch()
    },
  },
  methods: {
    getPage() {
      return this.$route.query?.page || 1
    },
    async fetchOffers() {
      await this.$store.dispatch('search/searchOffers', {
        text: this.searchInput,
        page: this.getPage(),
      })
    },
    async fetchNews() {
      await this.$store.dispatch('news/fetchNews', {
        page: this.getPage(),
        type: 1,
        searchText: this.searchInput,
      })
    },
    async fetchEvents() {
      await this.$store.dispatch('news/fetchNews', {
        page: this.getPage(),
        type: 2,
        searchText: this.searchInput,
      })
    },
  },
}
</script>

<style scoped></style>
