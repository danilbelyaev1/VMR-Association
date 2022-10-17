<template>
  <section v-if="deals.length" class="main-last-deal">
    <div class="container">
      <div class="main-last-deal-wrapper">
        <div class="swiper-last-deal-titles">
          <h3>Последние сделки</h3>
          <div class="swiper-last-deal-nav">
            <div
              ref="swiperPrev"
              class="swiper-last-deal-prev"
              @click="swiper.slidePrev()"
            >
              <svg
                width="41"
                height="41"
                viewBox="0 0 41 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M41 31C41 36.5228 36.5228 41 31 41L10 41C4.47715 41 -3.91405e-07 36.5229 -8.74228e-07 31L-2.71011e-06 10C-3.19293e-06 4.47716 4.47715 3.19293e-06 10 2.71011e-06L31 8.74228e-07C36.5228 3.91405e-07 41 4.47715 41 10L41 31Z"
                  fill="white"
                  fill-opacity="0.07"
                />
                <path
                  d="M24 13L16 21L24 29"
                  stroke="#F9F8FB"
                  stroke-opacity="0.2"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div
              ref="swiperNext"
              class="swiper-last-deal-next"
              @click="swiper.slideNext()"
            >
              <svg
                width="41"
                height="41"
                viewBox="0 0 41 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 10C0 4.47715 4.47715 0 10 0H31C36.5228 0 41 4.47715 41 10V31C41 36.5228 36.5228 41 31 41H10C4.47715 41 0 36.5228 0 31V10Z"
                  fill="white"
                  fill-opacity="0.07"
                />
                <path
                  d="M17 28L25 20L17 12"
                  stroke="#F9F8FB"
                  stroke-opacity="0.2"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <client-only>
          <div ref="swiperLastDeal" class="swiper-last-deal">
            <div class="swiper-wrapper">
              <MainLastDealItem
                v-for="(deal, index) in deals"
                :key="index"
                :deal="deal"
              />
            </div>
          </div>
        </client-only>
      </div>
    </div>
  </section>
</template>

<script>
import Swiper from 'swiper/swiper-bundle.min'
import 'swiper/swiper-bundle.min.css'

export default {
  name: 'MainLastDeal',

  data() {
    return {
      swiper: {},
      deals: [],
    }
  },

  async mounted() {
    await this.fetchDeals()
    await this.swiperUpdate()
  },

  updated() {
    this.swiperUpdate()
  },

  methods: {
    async fetchDeals() {
      try {
        const { data } = await this.$axios.$get('/deals/latest')
        if (data) {
          this.deals = data
        }
      } catch (e) {
        this.deals = []
      }
    },

    async swiperUpdate() {
      await this.$nextTick()
      this.swiper = new Swiper(this.$refs.swiperLastDeal, {
        breakpoints: {
          991: {
            slidesPerView: 2,
            spaceBetween: 16,
            direction: 'horizontal',
            loop: true,
          },
        },
        spaceBetween: 16,
      })
    },
  },
}
</script>
