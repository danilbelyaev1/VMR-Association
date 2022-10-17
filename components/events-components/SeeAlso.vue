<template>
  <div class="col-4">
    <h5>Возможно, вас заинтересует</h5>
    <ul v-if="!$fetchState.pending">
      <li v-for="(item, idx) in seeAlso" :key="idx">
        <nuxt-link
          :to="{
            name: type === 1 ? 'news-slug' : 'events-slug',
            params: { slug: item.slug },
          }"
        >
          {{ item.title }}
          <svg
            width="16"
            height="15"
            viewBox="0 0 17 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.5303 6.53033C16.8232 6.23744 16.8232 5.76256 16.5303 5.46967L11.7574 0.696698C11.4645 0.403805 10.9896 0.403805 10.6967 0.696698C10.4038 0.989592 10.4038 1.46447 10.6967 1.75736L14.9393 6L10.6967 10.2426C10.4038 10.5355 10.4038 11.0104 10.6967 11.3033C10.9896 11.5962 11.4645 11.5962 11.7574 11.3033L16.5303 6.53033ZM6.55671e-08 6.75L16 6.75L16 5.25L-6.55671e-08 5.25L6.55671e-08 6.75Z"
              fill="#01FFDB"
            />
          </svg>
        </nuxt-link>
      </li>
    </ul>
    <div v-else>Загрузка...</div>
  </div>
</template>

<script>
export default {
  name: 'SeeAlso',
  props: {
    type: {
      type: Number,
      required: true,
    },
  },

  async fetch() {
    const page = 1
    const type = this.type
    await this.$store.dispatch('news/fetchNews', { page, type })
  },
  computed: {
    seeAlso() {
      if (this.type === 1) return this.$store.getters['news/getNewsSeeAlso']
      else return this.$store.getters['news/getEventsSeeAlso']
    },
  },
  methods: {},
}
</script>

<style scoped></style>
