<template>
  <div>
    <my-button
      v-if="show"
      :disabled="loader || isConfirmed"
      class="btn btn-primary"
      :loader="loader"
      :text="confirmText"
      @click="sendConfirm"
    />
    <RateModal ref="rateModal" :deal="deal" />
  </div>
</template>

<script>
export default {
  name: 'ButtonConfirmDeal',
  props: {
    deal: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loader: false,
    }
  },
  computed: {
    show() {
      return Boolean(this.deal.can_confirm) && Boolean(this.confirmText)
    },
    isConfirmed() {
      if (this.isSeller) {
        return Boolean(this.deal.seller_confirmed_at)
      }

      if (this.isCustomer) {
        return Boolean(this.deal.customer_confirmed_at)
      }

      return false
    },
    user() {
      return this.$auth.user
    },
    authCompanyId() {
      return this.user?.company?.id || null
    },
    isSeller() {
      return this.authCompanyId === this.deal.seller?.id
    },
    isCustomer() {
      return this.authCompanyId === this.deal.customer?.id
    },
    confirmText() {
      if (this.isConfirmed) {
        return 'Ожидаем подтверждение контрагента'
      }

      if (this.isSeller) {
        return 'Подтвердить отправку'
      }

      if (this.isCustomer) {
        return 'Подтвердить получение'
      }

      return null
    },
  },
  methods: {
    async sendConfirm() {
      try {
        this.loader = true
        const url = `/deals/${this.deal.id}/confirm`

        const { data } = await this.$axios.$post(url)
        this.$refs.rateModal.open()
        this.$emit('on-confirm', data)
      } catch (e) {
        this.$emit('on-error', e.response?.data?.message || 'Ошибка сервера')
      } finally {
        this.loader = false
      }
    },
  },
}
</script>

<style scoped></style>
