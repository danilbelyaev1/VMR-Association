<template>
  <main class="content main-oferta">
    <BreadCrumbs />
    <section class="contacts">
      <div class="container">
        <div class="row content">
          <div class="col-md-12 col-xl-9">
            <h2>{{ page.title }}</h2>
            <div v-html="page.content"></div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'StatePage',
  fetchOnServer: true,

  data() {
    return {
      page: {},
      updated_at: null,
    }
  },

  async fetch() {
    const url = '/pages/state-you'
    const response = await this.$axios.$get(url)
    this.page = response.data
    this.updated_at = new Date(response.data.updated_at)
  },
  computed: {},
}
</script>

<style scoped></style>
