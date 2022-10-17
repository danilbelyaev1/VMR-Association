<template>
  <div class="col px-0 wrapPersAccountPay">
    <h4 class="pb-3 mb-3 w-100">Документы</h4>
    <div v-if="documents.length">
      <a href="#" class="documentLink position-relative d-table">
        Название документа 1
      </a>
    </div>
    <div v-else>В данный момент нет загруженных документов</div>
  </div>
</template>

<script>
export default {
  name: 'PersonalDocuments',
  fetchOnServer: true,

  data() {
    return {
      documents: [],
    }
  },

  async fetch() {
    const url = '/profile/company/documents'
    const response = await this.$axios.$get(url)

    this.documents = response.data
  },
}
</script>

<style scoped></style>
