<template>
  <b-modal
    id="something-wrong"
    ref="something-wrong"
    v-model="error"
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
    </template>
    <h4 class="modal-title">Что то пошло не так :(</h4>
    <div class="req-acc-text text-2">
      Попробуйте перезагрузить страницу позже
    </div>
    <template #modal-footer>
      <my-button
        class="btn btn-primary"
        text="Перезагрузить"
        :loader="false"
        @click="closeAndReload"
      />
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'SomethingWrong',
  props: {
    modalShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loader: true,
    }
  },
  computed: {
    error() {
      return this.$store.getters['errors/getShowErrorModal']
    },
  },
  methods: {
    close() {
      this.$bvModal.hide('something-wrong')
      this.$store.commit('errors/setNoServerError')
    },
    closeAndReload() {
      this.close()
      location.reload()
    },
  },
}
</script>

<style scoped></style>
