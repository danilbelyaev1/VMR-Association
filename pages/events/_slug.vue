<template>
  <main class="content">
    <BreadCrumbs :slug="{ name: slug, title: title }" />
    <section class="news-detail">
      <div class="container">
        <h2>{{ event.title }}</h2>
        <div class="row">
          <div v-if="!$fetchState.pending" class="col-8 static">
            <img :src="image" alt="" />
            <div class="mt-4" v-html="event.content"></div>
          </div>
          <div v-else class="col-8">Загрузка...</div>
          <see-also :type="2" />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { imageUrlOrNotFound } from '~/helpers'

export default {
  name: 'EventInside',
  fetchOnServer: false,
  data() {
    return {
      event: {},
    }
  },
  async fetch() {
    await this.fetchOffer()
  },
  computed: {
    image() {
      return imageUrlOrNotFound(this.event?.image)
    },
    slug() {
      return this.event?.slug || null
    },
    title() {
      return this.event?.title || null
    },
  },
  methods: {
    async fetchOffer() {
      try {
        this.loader = true
        const url = `/news/${this.$route.params.slug}`
        const response = await this.$axios.$get(url)
        this.event = response.data
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
