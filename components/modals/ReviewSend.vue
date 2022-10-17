<template>
  <b-modal
    id="review-send"
    hide-header-close
    centered
    content-class="modal-content"
  >
    <template #modal-header="{}">
      <button class="btnNone ic close" @click="close">
        <span aria-hidden="true">&times;</span>
      </button>
    </template>
    <h4 class="modal-title">Спасибо за отзыв!</h4>
    <div class="req-acc-text text-2">
      Он будет опубликован, после модерации.
    </div>
    <template #modal-footer>
      <my-button
        class="btn btn-primary"
        text="Понятно"
        :loader="false"
        @click="close"
      />
    </template>
  </b-modal>
</template>

<script>
import ErrorBaseMixin from '~/components/mixins/ErrorBaseMixin'

export default {
  name: 'ReviewSend',
  mixins: [ErrorBaseMixin],
  props: {
    modalShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loader: false,
    }
  },
  methods: {
    close() {
      this.$bvModal.hide('review-send')
    },
  },
}
</script>

<style scoped></style>
