<template>
  <my-button
    v-if="show"
    :disabled="loader || isSigned"
    class="btn btn-primary"
    :loader="loader"
    :text="signText"
    @click="startSigning"
  />
</template>

<script>
export default {
  name: 'ButtonSignDeal',
  props: {
    deal: {
      type: Object,
      required: true,
    },
    loader: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    show() {
      return this.deal.status?.key === 'waiting_signing'
    },
    isSigned() {
      if (this.isSeller) {
        return Boolean(this.deal.contract?.seller_signed_at)
      }

      if (this.isCustomer) {
        return Boolean(this.deal.contract?.customer_signed_at)
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
    signText() {
      if (this.isSigned) {
        return 'Ожидаем подпись контрагента'
      }
      return 'Подписать электронной подписью'
    },
    isEnableESignature() {
      return this.$store.getters['setting/isEnableESignature']
    },
  },
  methods: {
    async startSigning() {
      if (this.isEnableESignature) {
        await this.$bvModal.show('chooseCompanyForSigning')
      } else {
        await this.$bvModal.show('signatoryModal')
      }
      this.$emit('start-signing', this.deal.id, this.isSigned)
    },
  },
}
</script>

<style scoped></style>
