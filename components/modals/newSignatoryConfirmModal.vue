<template>
  <b-modal
    :id="modalId"
    :modal-class="['default-modal', modalClass]"
    :body-class="['align-items-center d-flex flex-column', bodyClass]"
    v-bind="$attrs"
    centered
    header-class="default"
  >
    <template #modal-header-close><span aria-hidden="true">×</span></template>
    <h3 v-if="title" :class="titleClass" v-text="title" />
    <div v-if="text" :class="textClass" v-text="text" />
    <div v-if="html" v-html="html" />

    <template #modal-footer>
      <a
        v-if="closeButtonText"
        class="btn btn-primary"
        :class="closeButtonClass"
        @click="close"
        v-text="closeButtonText"
      />
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'NewSignatoryConfirmModal',
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

  created() {
    this.$root.$on('bv::modal::hide', this.emitClose)
  },

  beforeDestroy() {
    this.$root.$off('bv::modal::hide', this.emitClose)
  },

  methods: {
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
  },
}
</script>

<style scoped></style>
