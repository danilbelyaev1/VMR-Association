<template>
  <b-modal id="add-to-cart" hide-header-close centered>
    <template #modal-header="{}">
      <button class="btnNone ic close" @click="close">
        <span aria-hidden="true">&times;</span>
      </button>
    </template>

    <h4 class="modal-title">Товар добавлен в корзину</h4>

    <template #modal-footer="{}">
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
export default {
  name: 'AddToCart',
  props: {
    modalShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  methods: {
    close() {
      this.$bvModal.hide('add-to-cart')
    },
  },
}
</script>

<style scoped></style>
