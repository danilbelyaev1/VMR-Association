<template>
  <b-modal id="subscribe-to-news-success" hide-header-close centered>
    <template #modal-header="{}">
      <button class="btnNone ic close" @click="close">
        <span aria-hidden="true">&times;</span>
      </button>
    </template>

    <h4 class="modal-title">Пожалуйста, подтвердите подписку</h4>
    <div class="modal-body">
      <p>Мы отправили вам письмо со ссылкой подтверждения.</p>

      <p>
        Если в течение 15 минут вы не получили письмо:
        <ul>
          <li>Посмотрите, пожалуйста, в папке "Спам"</li>
          <li>Проверьте, правильно ли вы написали свой адрес</li>
        </ul>
      </p>
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
export default {
  name: 'SubscribeToNewsSuccess',
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
      this.$bvModal.hide('subscribe-to-news-success')
    },
  },
}
</script>

<style scoped></style>
