<template>
  <section class="main-last">
    <div class="container">
      <div class="main-last-wrapper">
        <div class="main-last-wrapper-titles">
          <h3>Последние предложения</h3>
          <NuxtLink to="/catalog" class="main-last-wrapper-titles-btn">
            Смотреть всё
            <svg
              width="17"
              height="12"
              viewBox="0 0 17 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5303 6.53033C16.8232 6.23744 16.8232 5.76256 16.5303 5.46967L11.7574 0.696698C11.4645 0.403805 10.9896 0.403805 10.6967 0.696698C10.4038 0.989592 10.4038 1.46447 10.6967 1.75736L14.9393 6L10.6967 10.2426C10.4038 10.5355 10.4038 11.0104 10.6967 11.3033C10.9896 11.5962 11.4645 11.5962 11.7574 11.3033L16.5303 6.53033ZM6.55671e-08 6.75L16 6.75L16 5.25L-6.55671e-08 5.25L6.55671e-08 6.75Z"
                fill="white"
              />
            </svg>
          </NuxtLink>
        </div>
        <div class="row">
          <client-only>
            <MainLastItem
              v-for="offer in lastOffers"
              :key="offer.id"
              :last="offer"
            />
          </client-only>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MainLast',
  fetchOnServer: true,

  data() {
    return {}
  },

  async fetch() {
    const page = 1
    await this.$store.dispatch('catalog/fetchOffers', { page })
  },
  computed: {
    lastOffers() {
      return this.$store.getters['catalog/getLastOffers']
    },
  },
}
</script>

<style scoped></style>
