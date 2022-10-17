<template>
  <div>
    <ChooseCompanyForSigning
      modal-id="chooseCompanyForSigning"
      @next-step="checkSignatory"
    />
    <SignatoryModal
      modal-id="signatoryModal"
      :deal-id="dealId"
      :is-user-signing-second="isUserSigningSecond"
      @on-error="onModalError"
      @on-new-signatory="newSignatoryConfirm"
      @on-sign="prepareSign"
    />
    <DefaultModal
      modal-class=""
      close-button-text="Понятно"
      title="Документ подписан"
      modal-id="dealSigned"
    />
    <DefaultModal
      modal-class=""
      title="Вы дествительно хотите изменить подписанта?"
      text="Контрагент уже подписал документ, если вы продолжите подписание с новым подписантом ему придется подписать еще раз"
      confirm-text-yes="Да, изменить подписанта"
      confirm-text-no="Нет"
      confirm
      modal-id="newSignatoryConfirm"
      @confirmCancel="newSignatoryConfirmNo"
      @confirmAccept="newSignatoryConfirmYes"
      @close="newSignatoryConfirmClose"
    />
    <DefaultModal
      modal-class=""
      close-button-text="Понятно"
      modal-id="errorModalSigningDeal"
      :title="error.title"
      :text="error.text"
    />
  </div>
</template>

<script>
import { blobToBase64 } from '~/helpers/file'
import { signDataBase64 } from '~/plugins/cryptopro'

export default {
  name: 'SigningDeal',
  props: {
    dealId: {
      type: [Number, String],
      required: false,
    },
    isUserSigningSecond: {
      type: Boolean,
      default: false,
    },
    loader: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      newSignatory: {},
      certificate: null,
      error: {
        title: '',
        text: '',
      },
      loading: false,
    }
  },
  computed: {
    isEnableESignature() {
      return this.$store.getters['setting/isEnableESignature']
    },
  },
  methods: {
    onModalError(errorText) {
      this.error.title = errorText
      this.$bvModal.show('errorModalSigningDeal')
    },
    async checkSignatory(certificate) {
      this.certificate = certificate
      await this.$bvModal.show('signatoryModal')
    },
    newSignatoryConfirm(signatory) {
      this.newSignatory = signatory
      this.$bvModal.show('newSignatoryConfirm')
    },
    async prepareSign(body) {
      const url = `/deals/${this.dealId}/prepare-signing`
      try {
        await this.$axios.$post(url, body).then((response) => {
          this.signing(response?.data).then(() => {
            this.$bvModal.hide('signatoryModal')
            this.$bvModal.show('dealSigned')
            this.$emit('on-update', response?.data)
          })
        })
      } catch (e) {
        this.error.title = e.response.data.message
        await this.$bvModal.show('errorModalSigningDeal')
        await this.$bvModal.hide('signatoryModal')
      }
    },
    async newSignatoryConfirmYes() {
      const url = `/deals/${this.dealId}/prepare-signing`
      const body = this.newSignatory
      try {
        const response = await this.$axios.$post(url, body)
        await this.signing(response?.data)
        this.newSignatoryConfirmClose()
        this.$bvModal.show('dealSigned')
        this.$emit('on-update', response?.data)
      } catch (e) {
        this.error.title = e.response.data.message
        this.$bvModal.show('errorModalSigningDeal')
        await this.newSignatoryConfirmClose()
      }
    },
    newSignatoryConfirmNo() {
      this.newSignatoryConfirmClose()
    },
    newSignatoryConfirmClose() {
      this.$bvModal.hide('newSignatoryConfirm')
    },
    async signing(deal) {
      const throwError = (message) => {
        this.$emit('update:loader', false)
        this.error.title = message
        this.$bvModal.show('errorModalSigningDeal')
        throw new Error(message)
      }
      if (!this.isEnableESignature) {
        try {
          const data = await this.sendSignRequest(deal, null)
          this.$emit('update-deal', data)
        } catch (e) {
          throwError(e.response.data.message)
        }
        return
      }

      if (!this.certificate) {
        throwError(
          'Не удалось получить сертификат. Обновите страницу и попробуйте еще раз.'
        )
      }

      this.$emit('update:loader', true)
      const url = deal?.contract?.contract_document?.url
      if (!url) {
        throwError(
          'Не удалось получить договор купли-продажи, повторите попытку.'
        )
      }
      const response = await fetch(url)
      const blob = await response.blob()
      const dataBase64 = await blobToBase64(blob)

      let signedMessage

      try {
        signedMessage = await signDataBase64(this.certificate.data, dataBase64)
      } catch (e) {
        throwError(e.message)
      }

      try {
        const data = await this.sendSignRequest(deal, signedMessage)
        this.$emit('update-deal', data)
      } catch (e) {
        throwError(e.response.data.message)
      }
    },
    async sendSignRequest(deal, signedMessage) {
      const { data } = await this.$axios
        .$post(`/deals/${deal.id}/sign`, {
          signed_message: signedMessage,
        })
        .finally(() => this.$emit('update:loader', false))

      return data
    },
    update(deal) {
      this.$emit('on-update', deal)
      console.log('on-update:', deal)
    },
  },
}
</script>

<style scoped></style>
