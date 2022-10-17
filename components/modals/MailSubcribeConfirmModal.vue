<template>
  <b-modal :id="$options.modalId" hide-header-close centered>
    <template #modal-header="{}">
      <button class="btnNone ic close" @click="hide">
        <span aria-hidden="true">&times;</span>
      </button>
    </template>
    <h3 class="modal-title" v-text="title" />
    <div
      v-if="errorMessage"
      class="col-12 mt-2 position-sticky d-flex justify-content-center"
    >
      <span class="errorText position-sticky" v-text="errorMessage" />
    </div>
    <template #modal-footer>
      <my-button
        :text="buttonText"
        class="btn btn-primary"
        :loader="loader"
        @click="confirm"
      />
    </template>
  </b-modal>
</template>

<script>
import errorBaseMixin from '~/components/mixins/ErrorBaseMixin'

export default {
  name: 'MailSubscribeConfirmModal',
  mixins: [errorBaseMixin],
  props: {
    token: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loader: false,
      isSuccess: false,
    }
  },
  computed: {
    title() {
      return this.isSuccess
        ? 'Вы успешно подписались на новости'
        : 'Подтвердите, что вы подписываетесь на новости'
    },
    buttonText() {
      return this.isSuccess ? 'Хорошо' : 'Подтвердить'
    },
  },
  modalId: 'subscribe-confirm',
  methods: {
    show() {
      this.$bvModal.show(this.$options.modalId)
    },
    hide() {
      this.$bvModal.hide(this.$options.modalId)
    },
    async confirm() {
      if (this.isSuccess) {
        this.hide()
        return this.$router.replace('/')
      }

      try {
        this.errorMessage = null
        this.loader = true
        await this.$axios.$post('mail-subscribe/confirm', {
          token: this.token,
        })
        this.isSuccess = true
      } catch (e) {
        this.takeErrorResponseWithObserver(e, undefined, { timeout: 0 })
      } finally {
        this.loader = false
      }
    },
  },
}
</script>

<style scoped>
.errorText {
  background-color: unset;
}
</style>
