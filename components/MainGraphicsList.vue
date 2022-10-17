<template>
  <section v-show="showGraphics" class="main-graphics">
    <div class="container">
      <div class="swiper-graphics-nav">
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
      <div ref="swiperGraphics" class="main-graphics-wrapper">
        <div class="swiper-wrapper">
          <div v-if="showDealsGraphics" class="swiper-slide">
            <main-page-chart
              :labels="dealsLabels"
              :values="dealsRevenue"
              cumulative-sum
              title="Оборот, тыс.р"
            />
          </div>
          <div v-if="showOffersGraphics" class="swiper-slide">
            <main-page-chart
              :labels="offersLabels"
              :values="uniqueProductsValues"
              title="Уникальных видов товаров в продаже"
            />
          </div>
          <div v-if="showDealsGraphics" class="swiper-slide">
            <main-page-chart
              :labels="dealsLabels"
              :values="dealsCount"
              title="Количество сделок"
              cumulative-sum
            />
          </div>
          <div v-if="showDealsGraphics" class="swiper-slide">
            <main-page-chart
              :labels="dealsLabels"
              :values="dealsSoldQuantity"
              title="Оборот, т"
              cumulative-sum
            />
          </div>
          <div v-if="showOffersGraphics" class="swiper-slide">
            <main-page-chart
              :labels="offersLabels"
              :values="offersValues"
              title="Общее количество предложений в продаже"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Swiper from 'swiper/swiper-bundle.min'
import 'swiper/swiper-bundle.min.css'
export default {
  fetchOnServer: false,
  name: 'MainGraphicsList',
  data() {
    return {
      swiper: {},
      graphicsData: {
        closed_deals: [],
        offers: [],
      },
    }
  },
  async fetch() {
    try {
      this.graphicsData = await this.$axios.$get('/graphics/main-page')
    } catch (e) {}
  },
  computed: {
    showDealsGraphics() {
      return this.dealsLabels.length > 1
    },
    showOffersGraphics() {
      return this.offersLabels.length > 1
    },
    showGraphics() {
      return this.showDealsGraphics || this.showOffersGraphics
    },
    aggregatedDeals() {
      const aggregatedDeals = this.graphicsData.closed_deals?.reduce(
        (acc, item) => {
          if (!(item.closed_date in acc)) {
            acc[item.closed_date] = {
              revenue: 0,
              quantity: 0,
              count: 0,
            }
          }
          acc[item.closed_date].revenue += item.price
          acc[item.closed_date].quantity += item.quantity
          acc[item.closed_date].count += 1
          return acc
        },
        {}
      )

      const firstDate = this.$moment(Object.keys(aggregatedDeals || [])[0])
      const periodLength = this.$moment().diff(firstDate, 'day')
      for (let i = 0; i < periodLength; i++) {
        const key = firstDate.format('YYYY-MM-DD')
        if (!(key in aggregatedDeals)) {
          aggregatedDeals[key] = {
            revenue: 0,
            quantity: 0,
            count: 0,
          }
        }
        firstDate.add(1, 'days')
      }
      return aggregatedDeals
    },
    dealsLabels() {
      return Object.keys(this.aggregatedDeals || []).sort((a, b) =>
        this.$moment(a).isBefore(this.$moment(b)) ? -1 : 1
      )
    },
    dealsRevenue() {
      return this.dealsLabels.map(
        (label) => this.aggregatedDeals[label].revenue
      )
    },
    dealsSoldQuantity() {
      return this.dealsLabels.map(
        (label) => this.aggregatedDeals[label].quantity
      )
    },
    dealsCount() {
      return this.dealsLabels.map((label) => this.aggregatedDeals[label].count)
    },
    offersLabels() {
      return (this.graphicsData?.offers || [])
        .map((item) => item.date)
        .sort((a, b) => (this.$moment(a).isBefore(this.$moment(b)) ? -1 : 1))
    },
    offersValues() {
      return this.offersLabels.map(
        (date) =>
          this.graphicsData?.offers.find((item) => item.date === date)
            .offers_count
      )
    },
    uniqueProductsValues() {
      return this.offersLabels.map(
        (date) =>
          this.graphicsData?.offers.find((item) => item.date === date)
            .unique_products
      )
    },
  },
  async mounted() {
    await this.$nextTick()
    this.swiper = new Swiper(this.$refs.swiperGraphics, {
      breakpoints: {
        991: {
          slidesPerView: 3,
          spaceBetween: 59,
          direction: 'horizontal',
          loop: false,
        },
      },
      spaceBetween: 59,
    })
  },
}
</script>

<style scoped></style>
