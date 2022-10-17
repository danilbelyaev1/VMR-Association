<template>
  <b-modal
    id="rate-modal"
    ref="rate-modal"
    hide-header-close
    no-close-on-backdrop
    centered
    content-class="modal-content"
  >
    <template #modal-header="{}">
      <div class="mt-4"></div>
      <button class="btnNone ic close" @click="close">
        <span aria-hidden="true">&times;</span>
      </button>
      <h4 class="modal-title">
        Оцените продавца <br />
        {{ companyTitle }}
      </h4>
    </template>
    <div class="req-acc-text text-2">
      Вы совершили сделку, оцените ваше взаимодействие.
    </div>
    <StarRating v-model="myRate" />
    <template #modal-footer>
      <my-button
        class="btn btn-primary"
        text="Оценить"
        :loader="loader"
        @click="sendRate"
      />
      <my-button
        class="btn btn-outline btn-skip"
        text="Пропустить"
        :loader="false"
        @click="close"
      />
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'RateModal',
  props: {
    deal: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      myRate: 5,
      loader: false,
    }
  },
  computed: {
    companyTitle() {
      return this.deal?.seller?.name || ''
    },
  },
  methods: {
    async sendRate() {
      this.loader = true
      try {
        await this.$axios.post(`/deals/${this.deal.id}/rate`, {
          rate: this.myRate,
        })
      } catch (e) {
        alert(e.response?.data?.message || 'Произошла ошибка при отправке')
      } finally {
        this.loader = false
        this.close()
      }
    },
    open() {
      this.$bvModal.show('rate-modal')
    },
    close() {
      this.$bvModal.hide('rate-modal')
    },
  },
}
</script>

<style scoped></style>
