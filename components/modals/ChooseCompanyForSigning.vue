<template>
  <b-modal
    :id="modalId"
    :modal-class="['default-modal', modalClass]"
    :body-class="['align-items-center d-flex flex-column', bodyClass]"
    v-bind="$attrs"
    centered
    header-class="default"
    no-stacking
  >
    <template #modal-header-close><span aria-hidden="true">×</span></template>

    <h3 :class="titleClass" class="mb-4" v-text="headerText" />
    <div v-if="infoText" :class="textClass" v-text="infoText" />

    <div v-if="certificates.length" class="d-flex w-100 flex-column">
      <div
        v-for="certificate in certificates"
        :key="certificate.serialNumber"
        class="mb-2"
      >
        <input
          :id="`radio-${certificate.serialNumber}`"
          v-model="selected"
          type="radio"
          class="radio"
          :value="certificate.serialNumber"
        />
        <label
          :for="`radio-${certificate.serialNumber}`"
          class="radio-label mr-3 text-body"
          v-text="certificate.title"
        />
      </div>
    </div>
    <template #modal-footer>
      <div v-show="!loading">
        <my-button
          v-if="!error && certificates.length"
          :disabled="!selected"
          class="btn btn-primary"
          :loader="false"
          text="Продолжить"
          @click="nextStep"
        />
        <my-button
          v-else
          class="btn btn-primary"
          text="Закрыть"
          @click="close"
        />
      </div>
    </template>
  </b-modal>
</template>

<script>
/* eslint-disable no-undef */
import { fetchCertificates } from '~/plugins/cryptopro'

const cryptoProApi =
  'https://cryptopro.ru/sites/default/files/products/cades/cadesplugin_api.js'

export default {
  name: 'ChooseCompanyForSigning',
  props: {
    modalId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
    titleClass: {
      type: String,
      default: 'modal-title mb-3',
    },
    text: {
      type: String,
      default: null,
    },
    html: {
      type: String,
      default: null,
    },
    textClass: {
      type: String,
      default: 'text-2 req-acc-text mb-4',
    },
    modalClass: {
      type: String,
      default: null,
    },
    bodyClass: {
      type: String,
      default: null,
    },
    closeButtonText: {
      type: String,
      default: null,
    },
    closeButtonClass: {
      type: [String, Object, Array],
      default: null,
    },
    confirmButtonClass: {
      type: [String, Object, Array],
      default: null,
    },
    confirm: {
      type: Boolean,
      default: false,
    },
    confirmClass: {
      type: [String, Object, Array],
      default: null,
    },
    confirmTextYes: {
      type: String,
      default: 'Да',
    },
    confirmTextNo: {
      type: String,
      default: 'Нет',
    },
    hideConfirmButtonWithCancelAction: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      error: null,
      loading: false,
      selected: null,
      certificates: [],
      initCondition: false,
    }
  },

  computed: {
    isEnableESignature() {
      return this.$store.getters['setting/isEnableESignature']
    },
    headerText() {
      if (this.loading) {
        return 'Загружаем список сертификатов'
      }

      if (this.error) {
        return this.error
      }

      if (!this.loading && this.certificates.length) {
        return 'Выберите компанию для подписи'
      }

      return 'Оформление сделки не доступно'
    },
    infoText() {
      if (!this.loading && !this.certificates.length) {
        return 'У вас нет сертификата электронной подписи'
      }
      return ''
    },
    certSelected() {
      return (
        this.certificates.find((cert) => cert.serialNumber === this.selected) ||
        null
      )
    },
  },

  mounted() {
    this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
      if (modalId === this.modalId) {
        this.init()
      }
    })
    this.$root.$on('bv::modal::hide', this.emitClose)
    if (!this.isEnableESignature) {
      this.nextStep()
    }
  },

  beforeDestroy() {
    this.$root.$off('bv::modal::show', (bvEvent, modalId) => {
      if (modalId === this.modalId) {
        this.init()
      }
    })
    this.$root.$off('bv::modal::hide', this.emitClose)
  },
  methods: {
    init() {
      if (this.initCondition) return

      if (!this.isEnableESignature) {
        this.close()
        this.nextStep()
        return
      }

      this.$loadScript(cryptoProApi).then(async () => {
        this.initCondition = true
        await this.fetchCertificates()
      })
    },

    async fetchCertificates() {
      this.error = null
      this.loading = true
      try {
        this.certificates = await fetchCertificates()
      } catch (e) {
        this.error = e.message
        this.initCondition = false
      } finally {
        this.loading = false
      }
    },

    show() {
      this.$bvModal.show(this.modalId)
    },

    close() {
      this.$bvModal.hide(this.modalId)
    },

    emitClose(bvEvent, modalId) {
      if (this.modalId === modalId) {
        this.$emit('close')
      }
    },

    nextStep() {
      this.$emit('next-step', this.certSelected)
    },
  },
}
</script>

<style scoped>
.radio-label {
  color: #343947;
}
</style>
