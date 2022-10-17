<template>
  <div class="container">
    <div v-if="hasDeals" class="deal-cards-wrapper">
      <div class="row">
        <DealCard
          v-for="deal in deals"
          :key="deal.id"
          :deal="deal"
          class="deal-card col-12"
          @update-deal="update"
          @cancel-deal="cancelDealConfirmation"
          @sign-deal="startSigning"
          @on-error="onError"
        />
      </div>
      <Pagination :meta="meta" @paginate="paginate" />
    </div>
    <slot v-else name="no-deals" />
    <client-only>
      <SigningDeal
        :deal-id="dealId"
        :is-user-signing-second="isUserSigningSecond"
        :loader.sync="loader"
        @update-deal="update"
      />
      <DefaultModal
        modal-class=""
        close-button-text="Понятно"
        modal-id="errorModal"
        :title="error.title"
        :text="error.text"
      />
      <DefaultModal
        modal-class=""
        close-button-text="Понятно"
        modal-id="cancelModal"
        :title="'Сделка отменена'"
      />
      <DefaultModal
        modal-class=""
        :title="`Вы действительно хотите отменить сделку №${dealId} от ${dealDate}?`"
        confirm-text-yes="Да, отменить сделку"
        confirm-text-no="Нет"
        confirm
        modal-id="cancelDealConfirmation"
        @confirmCancel="confirmCancelDealNo"
        @confirmAccept="confirmCancelDealYes"
        @close="confirmCancelClose"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'DealList',

  props: {
    deals: {
      type: Array,
      required: false,
    },
    meta: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      error: {
        title: '',
        text: '',
      },
      dealId: '',
      dealDate: '',
      isUserSigningSecond: false,
      newSignatory: {},
      loader: false,
    }
  },
  computed: {
    hasDeals() {
      return Boolean(this.deals.length)
    },
    isEnableESignature() {
      return this.$store.getters['setting/isEnableESignature']
    },
  },

  methods: {
    paginate(page) {
      this.$emit('paginate', page)
    },
    update(deal) {
      this.$emit('update-deal', deal)
    },
    cancelDealConfirmation(dealId, dealDate) {
      this.dealDate = dealDate
      this.dealId = dealId
      this.$bvModal.show('cancelDealConfirmation')
    },
    confirmCancelDealNo() {
      this.confirmCancelClose()
    },
    async confirmCancelDealYes() {
      try {
        const url = `/deals/${this.dealId}/cancel`
        await this.$axios.$post(url)
        this.confirmCancelClose()
        await this.update()
        await this.$bvModal.show('cancelModal')
      } catch (e) {
        this.error = e.response?.data?.message || 'Ошибка сервера'
        this.$bvModal.show('errorModal')
      }
    },
    onError(msg) {
      this.error.title = msg
      this.$bvModal.show('errorModal')
    },
    confirmCancelClose() {
      this.dealDate = ''
      this.dealId = ''
      this.$bvModal.hide('cancelDealConfirmation')
    },
    startSigning(deal, isUserSigningSecond) {
      this.dealId = deal.id
      this.isUserSigningSecond = isUserSigningSecond
      if (this.isEnableESignature) {
        this.$bvModal.show('chooseCompanyForSigning')
      } else {
        this.$bvModal.show('signatoryModal')
      }
    },
  },
}
</script>

<style scoped></style>
