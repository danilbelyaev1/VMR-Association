<template>
  <section class="main-ad-slider">
    <div class="container">
      <div class="swiper-ad-nav">
        <div class="swiper-ad-prev" @click="swiper.slidePrev()">
          <svg
            width="16"
            height="30"
            viewBox="0 0 16 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 1L0.999999 15L15 29"
              stroke="#E0E0E0"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="swiper-ad-next" @click="swiper.slideNext()">
          <svg
            width="16"
            height="30"
            viewBox="0 0 16 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 29L15 15L1 1"
              stroke="#E0E0E0"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div ref="swiperAd" class="swiper-ad">
        <div class="swiper-wrapper">
          <a
            v-for="(adv, idx) in adverts"
            :key="idx"
            :href="adv.link"
            class="swiper-slide"
            target="_blank"
            style="'display': 'block'"
            :style="{
              background: `url(${adv.image.url}) center center / cover no-repeat`,
            }"
          ></a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Swiper from 'swiper/swiper-bundle.min'
import 'swiper/swiper-bundle.min.css'
export default {
  name: 'MainAd',
  fetchOnServer: true,

  data() {
    return {
      swiper: {},
      adverts: [],
    }
  },

  async fetch() {
    try {
      const response = await this.$axios.$get('/adverts')
      this.adverts = response.data.filter((item) => !!item.image)
    } catch (e) {}
  },
  async mounted() {
    await this.$nextTick()
    // eslint-disable-next-line no-new
    this.swiper = new Swiper(this.$refs.swiperAd, {
      breakpoints: {
        767: {
          slidesPerView: 3,
          spaceBetween: 16,
          direction: 'horizontal',
          loop: true,
        },
      },
      spaceBetween: 16,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    })
  },
}
</script>

<style scoped></style>
