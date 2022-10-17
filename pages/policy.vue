<template>
  <main class="content contacts main-polit">
    <BreadCrumbs />
    <section class="contacts">
      <div class="container">
        <div class="row">
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
  name: 'PolicyPage',
  fetchOnServer: true,

  data() {
    return {
      page: {},
    }
  },

  async fetch() {
    const url = '/pages/policy'
    const response = await this.$axios.$get(url)
    this.page = response.data
  },
}
</script>

<style scoped></style>
