<template>
  <b-modal
    id="subscribe-to-news"
    hide-header-close
    centered
    content-class="modal-content"
  >
    <template #modal-header="{}">
      <h4 class="modal-title">Подписаться на новости</h4>
      <button class="btnNone ic close" @click="close">
        <span aria-hidden="true">&times;</span>
      </button>
    </template>
    <ValidationObserver
      ref="observer"
      v-slot="{}"
      tag="form"
      class=""
      @submit.prevent=""
    >
      <div class="col-12">
        <div class="input-default1" style="padding: 0">
          <input-validate
            ref="email"
            v-model.trim="form.email"
            :disable-root-classes="true"
            :disable-input-classes="true"
            vid="email"
            label="Email"
            placeholder=""
            rules="required"
            type="email"
            :error-message="errorMessage"
          />
        </div>
      </div>
    </ValidationObserver>
    <template #modal-footer>
      <my-button
        class="btn btn-primary"
        text="Подписаться"
        :loader="loader"
        @click="subscribe"
      />
    </template>
  </b-modal>
</template>

<script>
import ErrorBaseMixin from '~/components/mixins/ErrorBaseMixin'

export default {
  name: 'SubscribeToNews',
  mixins: [ErrorBaseMixin],
  props: {
    modalShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        email: null,
      },
      loader: false,
    }
  },
  methods: {
    close() {
      this.$bvModal.hide('subscribe-to-news')
    },
    async subscribe() {
      this.errorMessage = null
      this.loader = true

      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        this.loader = false
        return
      }

      try {
        await this.$axios.$post('/mail-subscribe', this.form).then(() => {
          this.close()
          this.form.email = null
          this.$bvModal.show('subscribe-to-news-success')
        })
      } catch (e) {
        this.takeErrorResponseWithObserver(e, this.$refs.observer, {
          timeout: 0,
        })
      } finally {
        this.loader = false
      }
    },
  },
}
</script>

<style scoped></style>
