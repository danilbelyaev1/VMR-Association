<template>
  <main class="content">
    <BreadCrumbs />
    <section class="questions">
      <div class="container">
        <div class="row">
          <div class="col-8">
            <h2>Часто задаваемые вопросы</h2>
            <div
              v-if="!$fetchState.pending"
              class="wrapPersAccountHelpAccordion w-100"
            >
              <my-accordion
                v-for="(faq, idx) in faqList"
                :key="idx"
                :accordion-data="faq"
                class="accordion-element"
              />
            </div>
            <div v-else>Загрузка...</div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'FaqPage',
  fetchOnServer: true,

  data() {
    return {
      faqList: [],
    }
  },
  async fetch() {
    const response = await this.$axios.$get('/faq', {})
    this.faqList = response.data
  },
}
</script>

<style scoped></style>
