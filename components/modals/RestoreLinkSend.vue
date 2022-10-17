<template>
  <b-modal
    id="restore-link-send"
    hide-header-close
    centered
    @hide="closeAndRedirect"
  >
    <template #modal-header="{}">
      <button class="btnNone ic close" @click="closeAndRedirect">
        <span aria-hidden="true">&times;</span>
      </button>
    </template>
    <h4 class="modal-title">
      Ссылка на создание нового пароля отправлена вам на указанный почтовый ящик
    </h4>
    <template #modal-footer>
      <my-button
        class="btn btn-primary"
        text="Понятно"
        :loader="false"
        @click="closeAndRedirect"
      />
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'RestoreLinkSend',
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
    closeAndRedirect() {
      this.$bvModal.hide('restore-link-send')
      this.$router.push('/')
    },
  },
}
</script>

<style scoped></style>
