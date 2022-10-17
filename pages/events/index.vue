<template>
  <main class="content news">
    <BreadCrumbs />
    <section class="news event">
      <div class="container">
        <h2>Реализованные мероприятия</h2>
        <EventsList
          v-if="!$fetchState.pending"
          :events="events"
          :type="2"
          :meta="eventsMeta"
          @paginate="$fetch"
        />
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'EventsPage',
  fetchOnServer: true,

  async fetch() {
    const page = this.$route.query?.page || 1
    const type = 2

    await this.$store.dispatch('news/fetchNews', { page, type })
  },
  computed: {
    events() {
      return this.$store.state.news.events.list
    },
    eventsMeta() {
      return this.$store.state.news.events.meta
    },
  },
}
</script>

<style scoped></style>
