<template>
  <main class="content">
    <BreadCrumbs :slug="{ name: slug, title: title }" />
    <section class="news-detail">
      <div class="container">
        <h2>{{ title }}</h2>
        <div class="row">
          <div v-if="!$fetchState.pending" class="col-8 static">
            <img :src="image" alt="" />
            <div class="mt-4" v-html="news.content"></div>
          </div>
          <div v-else class="col-8">Загрузка...</div>
          <see-also :type="1" />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { imageUrlOrNotFound } from '~/helpers'

export default {
  name: 'NewsInside',
  fetchOnServer: false,
  data() {
    return {
      news: {},
    }
  },
  async fetch() {
    await this.fetchOffer()
  },
  computed: {
    image() {
      return imageUrlOrNotFound(this.news?.image)
    },
    slug() {
      return this.news?.slug || null
    },
    title() {
      return this.news?.title || null
    },
  },
  methods: {
    async fetchOffer() {
      try {
        this.loader = true
        const url = `/news/${this.$route.params.slug}`
        const response = await this.$axios.$get(url)
        this.news = response.data
      } catch (e) {
        if (e.response.status === 404) {
          this.$nuxt.error({ statusCode: 404, message: 'Page not found' })
        } else {
          // eslint-disable-next-line no-console
          console.error(e)
        }
      } finally {
        this.loader = false
      }
    },
  },
}
</script>

<style scoped></style>
