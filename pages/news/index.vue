<template>
  <main class="content news">
    <BreadCrumbs />
    <section class="news event">
      <div class="container">
        <h2>Новости</h2>
        <EventsList
          v-if="!$fetchState.pending"
          :events="news"
          :type="1"
          :meta="newsMeta"
          @paginate="$fetch"
        />
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'NewsPage',
  fetchOnServer: false,

  async fetch() {
    const page = this.$route.query?.page || 1
    const type = 1
    await this.$store.dispatch('news/fetchNews', { page, type })
  },
  computed: {
    news() {
      return this.$store.state.news.news.list
    },
    newsMeta() {
      return this.$store.state.news.news.meta
    },
  },
}
</script>

<style scoped></style>
