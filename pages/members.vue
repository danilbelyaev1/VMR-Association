<template>
  <main class="content">
    <BreadCrumbs />
    <section class="member reviews">
      <div class="container">
        <h2 v-html="page.title"></h2>
        <div class="row">
          <div class="col-8">
            <div v-html="page.content"></div>
            <nuxt-link to="/register" tag="button" class="btn btn-primary">
              Вступить
            </nuxt-link>
          </div>
          <div class="col-4">
            <div class="review-wrapper">
              <h5>Оставьте свой отзыв</h5>
              <ValidationObserver
                ref="observer"
                v-slot="{}"
                tag="form"
                class=""
                @submit.prevent=""
              >
                <input-validate
                  ref="user_name"
                  v-model="form.name"
                  :disable-root-classes="true"
                  :disable-input-classes="true"
                  error-class="b-error"
                  vid="user_name"
                  label="Ваше имя"
                  placeholder=""
                  rules="required|ru_only"
                  type="text"
                />
                <input-validate
                  ref="user_email"
                  v-model="form.email"
                  :disable-root-classes="true"
                  :disable-input-classes="true"
                  error-class="b-error"
                  vid="user_email"
                  label="Почта"
                  placeholder=""
                  rules="required|email"
                  type="text"
                />
                <div
                  class="textarea-default"
                  style="position: relative; margin-bottom: 16px"
                >
                  <label for="commentary" class="label-name">Комментарий</label>
                  <ValidationProvider
                    v-slot="{ failed, errors }"
                    class="textarea-default"
                    tag="div"
                    name="Комментерий"
                    rules="required"
                    vid="commentary"
                  >
                    <textarea
                      id="commentary"
                      v-model="form.comment"
                      style="resize: none"
                      :class="[
                        {
                          'is-invalid error': failed,
                        },
                      ]"
                      name="commentary"
                    >
                    </textarea>
                    <div
                      v-if="failed"
                      class="b-error"
                      v-text="errors.join(', ')"
                    />
                  </ValidationProvider>
                </div>
                <GoogleRecaptcha ref="captcha" />
              </ValidationObserver>
              <my-button
                :disabled="loader"
                class="btn btn-primary"
                :loader="loader"
                text="Отправить сообщение"
                @click="send"
              />
              <!--              <a class="send" @click.prevent="send">Отправить сообщение</a>-->
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import ErrorBaseMixin from '~/components/mixins/ErrorBaseMixin'

export default {
  name: 'MembersPage',
  fetchOnServer: true,
  mixins: [ErrorBaseMixin],

  data() {
    return {
      page: {},
      form: {
        name: null,
        email: null,
        comment: null,
        g_recaptcha_response: null,
      },
      loader: false,
    }
  },
  async fetch() {
    const url = '/pages/members'
    const response = await this.$axios.$get(url)
    this.page = response.data
  },
  methods: {
    async send() {
      this.loader = true
      await this.fetchCaptchaToken()

      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        this.loader = false
        return
      }

      try {
        await this.$axios.$post('/feedback', this.form).then(() => {
          this.$bvModal.show('review-send')
          this.form.name = ''
          this.form.email = ''
          this.form.comment = ''
          this.$refs.observer.reset()
        })
      } catch (e) {
        this.takeErrorResponseWithObserver(e, this.$refs.observer)
      } finally {
        this.loader = false
      }
    },
    async fetchCaptchaToken() {
      this.form.g_recaptcha_response = await this.$refs.captcha.getToken()
    },
  },
}
</script>

<style scoped>
textarea {
  width: 100%;
  color: #bcbcbc;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  padding: 13px 16px;
  background-color: transparent;
}
textarea.error {
  border: 1px solid #d05359 !important;
}
.errorText {
  top: unset;
  left: unset;
  bottom: 0;
}
.send {
  cursor: pointer;
}
.b-error {
  font-size: 14px;
  line-height: 1.4;
  padding: 8px;
  color: #d05359;
  top: 75px;
  left: 0;
  border-radius: 10px;
  transition: 0.3s;
}
</style>
