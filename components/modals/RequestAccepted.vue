<template>
  <b-modal id="request-accepted" hide-header-close centered>
    <template #modal-header="{}">
      <button class="btnNone ic close" @click="closeAndRedirect">
        <span aria-hidden="true">&times;</span>
      </button>
    </template>
    <h3 class="modal-title">Ваша заявка принята на рассмотрение</h3>
    <div class="req-acc-text text-2">
      В случае положительного решения, Вам на e-mail будет отправлена ссылка на
      установку пароля для вашей учетной записи.
      <br />
      <br />
      В случае отрицательного решения, Вы сможете подать заявку еще раз, с
      учетом всех замечаний, которые так же будут отправлены вам электронную
      почту.
    </div>
    <template #modal-footer>
      <my-button
        text="Понятно"
        class="btn btn-primary"
        @click="closeAndRedirect"
      />
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'RequestAccepted',
  methods: {
    closeAndRedirect() {
      this.$bvModal.hide('request-accepted')
      this.$router.push('/')
    },
  },
}
</script>

<style scoped></style>
