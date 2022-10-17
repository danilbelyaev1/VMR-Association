<template>
  <b-modal id="deal-only-for-login-user" hide-header-close centered>
    <template #modal-header="{}">
      <button class="btnNone ic close" @click="close">
        <span aria-hidden="true">&times;</span>
      </button>
    </template>
    <div class="modal-title" style="padding: 0 16px">
      Оформление сделки доступно только для зарегистрированных пользователей
    </div>
    <template #modal-footer>
      <my-button
        class="btn btn-primary"
        text="Регистрация"
        :loader="false"
        @click="redirectToRegister"
      />
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'DealOnlyForLoginUser',
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
      this.$bvModal.hide('deal-only-for-login-user')
    },
    redirectToRegister() {
      this.close()
      this.$router.push('/register')
    },
  },
}
</script>

<style scoped></style>
