<template>
  <b-modal
    id="sms-form"
    hide-header-close
    centered
    footer-class="loginModal-footer"
  >
    <template #modal-header="{}">
      <button class="btnNone ic close" @click="close">
        <span aria-hidden="true">&times;</span>
      </button>
    </template>
    <h4 class="modal-title">Введите код из SMS</h4>
    <div class="input-default1" style="padding: 0">
      <validation-observer
        ref="smsObserver"
        tag="form"
        @submit.prevent="confirm()"
      >
        <div class="col-12 mb-3">
          <input-validate
            ref="code"
            v-model.trim="form.code"
            :disable-root-classes="true"
            :disable-input-classes="true"
            vid="code"
            :label="label"
            placeholder=""
            rules="required"
            type="text"
            autocomplete="on"
            @keydown.enter="confirm"
          />
        </div>
      </validation-observer>
    </div>
    <template #modal-footer>
      <my-button
        class="btn btn-primary"
        text="Подтвердить"
        :loader="isLoading"
        @click="confirm"
        @keydown.enter="confirm"
      />
    </template>
  </b-modal>
</template>

<script>
import ErrorBaseMixin from '~/components/mixins/ErrorBaseMixin'

export default {
  name: 'SmsConfirm',
  mixins: [ErrorBaseMixin],
  props: {
    modalShow: {
      type: Boolean,
      default: false,
    },
    onRegisterComplete: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
      form: {
        code: null,
      },
    }
  },
  computed: {
    label() {
      return 'Код отправлен на номер: ' + this.phone
    },
  },
  methods: {
    async confirm() {
      const isValid = await this.$refs.smsObserver.validate()
      if (!isValid) return

      this.isLoading = true

      try {
        const response = await this.$axios.$post('/auth/verify-phone', {
          code: this.form.code,
        })
        const profile = response.data
        this.$emit('confirm', { profile })
        console.log(profile)
        await this.close()

        if (this.onRegisterComplete) {
          this.$bvModal.show('request-accepted')
        }
      } catch (error) {
        this.takeErrorResponseWithObserver(error, this.$refs.loginObserver)
        this.$emit('verify-phone', false)
        await this.close()
        if (this.onRegisterComplete) {
          this.$bvModal.show('request-accepted')
        }
      }
      this.isLoading = false
    },
    async close() {
      await this.$bvModal.hide('sms-form')
    },
  },
}
</script>

<style scoped></style>
