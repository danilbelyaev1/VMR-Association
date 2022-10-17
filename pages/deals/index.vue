<template>
  <main class="content">
    <BreadCrumbs />
    <section class="deal-cards">
      <DealList
        v-if="!$fetchState.pending"
        :deals="deals"
        :meta="dealsMeta"
        @paginate="$fetch"
        @update-deal="updateDeals"
      >
        <template #no-deals>
          <div class="marketplace-catalog-wrapper">
            <h4>Вы пока не заключили ни одной сделки</h4>
          </div>
        </template>
      </DealList>
      <div v-else class="d-flex align-content-center justify-content-center">
        <div class="loader-wrap">
          <span class="loader"></span>
          <div class="loader-circle"></div>
        </div>
      </div>
    </section>
    <client-only>
      <DefaultModal
        modal-class=""
        close-button-text="Понятно"
        modal-id="cancelModal"
        :title="'Сделка отменена'"
      />
      <DefaultModal
        modal-class=""
        close-button-text="Понятно"
        modal-id="errorModal"
        :title="error"
      />
    </client-only>
  </main>
</template>

<script>
export default {
  name: 'MyDialPage',
  middleware: 'auth',
  fetchOnServer: false,

  data() {
    return {
      dealsData: [],
      error: '',
    }
  },

  async fetch() {
    try {
      const page = this.$route.query?.page || 1
      const url = '/deals'
      const response = await this.$axios.get(url, { params: { page } })

      this.dealsData = response.data || []
    } catch (e) {
      this.error = e.response?.data?.message || 'Ошибка сервера'
      this.$bvModal.show('errorModal')
    }
  },
  computed: {
    dealsMeta() {
      return this.dealsData?.meta || {}
    },
    deals() {
      return this.dealsData?.data || []
    },
  },
  methods: {
    updateDeals(deal) {
      this.dealsData.data = this.dealsData.data.map((x) =>
        x.id === deal?.id ? deal : x
      )
    },
  },
}
</script>

<style scoped></style>
