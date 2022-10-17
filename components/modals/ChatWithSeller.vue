<template>
  <div>
    <b-modal id="chat-seller-modal" hide-header-close centered>
      <template #modal-header="{}">
        <h4 class="modal-title">Сообщение продавцу</h4>
        <button class="btnNone ic close" @click="close">
          <span aria-hidden="true">&times;</span>
        </button>
      </template>

      <div class="input-default1 mb-0">
        <p class="text-primary">Напишите ваш вопрос или предложение.</p>

        <validation-observer
          ref="observer"
          tag="form"
          @submit.prevent="createChat"
        >
          <input-validate
            ref="sender_email"
            v-model="form.sender_email"
            class="col-12"
            :disable-root-classes="true"
            :disable-input-classes="true"
            error-class="errorText pl-0"
            vid="sender_email"
            label="Почта (для дальнейшей переписки)"
            error-name="Почта"
            rules="required|email|max:254"
          />
          <input-validate
            ref="sender_name"
            v-model="form.sender_name"
            class="col-12 mt-4"
            error-class="errorText pl-0"
            :disable-root-classes="true"
            :disable-input-classes="true"
            vid="sender_name"
            label="Фамилия имя отчество"
            rules="required|max:254"
          />
          <my-textarea
            ref="message"
            v-model="form.message"
            class="col-12 mt-4"
            :disable-input-classes="true"
            error-class="errorText pl-0"
            vid="message"
            label="Сообщение продавцу"
            rules="required|max:65000"
          />
        </validation-observer>
      </div>
      <GoogleRecaptcha ref="captcha" />

      <template #modal-footer="{}">
        <div class="modal-footer-text text-2">
          Обращаем ваше внимание, что дальнейшая переписка будет осуществляться
          вами самостоятельно, минуя сайт.
        </div>
        <my-button
          class="btn btn-primary"
          text="Отправить сообщение"
          :loader="loader"
          @click="createChat"
        />
      </template>
    </b-modal>

    <DefaultModal
      modal-class=""
      close-button-text="Понятно"
      modal-id="chat-seller-error-modal"
      :title="errorMessage"
      @close="errorMessage = null"
    />
    <DefaultModal
      modal-id="chat-seller-success"
      :title="successTitleModal"
      :text="successTextModal"
      close-button-text="Понятно"
      @close="onCloseSuccessModal"
    />
  </div>
</template>

<script>
import ErrorBaseMixin from '~/components/mixins/ErrorBaseMixin'

const formDefault = {
  sender_email: null,
  sender_name: null,
  message: null,
  offer_id: null,
  g_recaptcha_response: null,
}

export default {
  name: 'ChatWithSeller',
  mixins: [ErrorBaseMixin],
  props: {
    modalShow: {
      type: Boolean,
      default: false,
    },
    offer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loader: false,
      error: null,
      form: Object.assign({}, formDefault),
      successSenderEmail: null,
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
    successTitleModal() {
      return (
        'Ваше сообщение отправлено ' + this.offer?.company?.name || 'продавцу'
      )
    },
    successTextModal() {
      return 'Ответ от продавца ожидайте на почту ' + this.successSenderEmail
    },
  },
  created() {
    this.formFillDefault()
  },
  methods: {
    formFillDefault() {
      this.form.offer_id = this.offer.id
      this.form.sender_email = this.user?.email || null
      this.form.sender_name =
        [
          this.user?.surname || null,
          this.user?.name || null,
          this.user?.patronymic || null,
        ]
          .filter((i) => !!i)
          .join(' ') || null
    },
    open() {
      this.$bvModal.show('chat-seller-modal')
    },
    close() {
      this.$bvModal.hide('chat-seller-modal')
    },
    async createChat() {
      this.loader = true
      await this.fetchCaptchaToken()

      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        this.loader = false
        return
      }

      try {
        await this.$axios.post('/chats', this.form)
        this.close()
        this.showSuccessModal()
        this.clearForm()
      } catch (e) {
        this.takeErrorResponseWithObserver(e, this.$refs.observer, {
          timeout: 0,
        })
        if (this.errorMessage) {
          this.$bvModal.show('chat-seller-error-modal')
        }
      } finally {
        this.loader = false
      }
    },
    showSuccessModal() {
      this.successSenderEmail = this.form.sender_email
      this.$bvModal.show('chat-seller-success')
    },
    onCloseSuccessModal() {
      this.successSenderEmail = null
    },
    async fetchCaptchaToken() {
      this.form.g_recaptcha_response = await this.$refs.captcha.getToken()
    },
    clearForm() {
      this.form = Object.assign({}, formDefault)
      this.formFillDefault()
    },
  },
}
</script>

<style scoped></style>
