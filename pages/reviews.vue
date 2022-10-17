<template>
  <main class="content">
    <BreadCrumbs />
    <section class="reviews">
      <div class="container">
        <h2>Отзывы</h2>
        <div class="row">
          <div v-if="!$fetchState.pending" class="col-8">
            <div
              v-for="review in reviewsList"
              :key="review.id"
              class="review-card"
            >
              <div class="review-card-titles">
                <div class="review-card-name h5">{{ review.name }}</div>
                <div v-if="review.user" class="review-card-company text-2">
                  {{
                    review.user.company.short_name || review.user.company.name
                  }}
                </div>
              </div>
              <div class="review-card-text text-2">
                {{ review.comment }}
              </div>
            </div>
            <Pagination :meta="meta" @paginate="$fetch" />
          </div>
          <div
            v-else
            class="col-8 d-flex align-content-center justify-content-center"
          >
            <div class="loader-wrap">
              <span class="loader"></span>
              <div class="loader-circle"></div>
            </div>
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
                <!--                <input-validate-->
                <!--                  ref="user_email"-->
                <!--                  v-model="form.company"-->
                <!--                  :disable-root-classes="true"-->
                <!--                  :disable-input-classes="true"-->
                <!--                  vid="user_email"-->
                <!--                  label="Компания"-->
                <!--                  placeholder=""-->
                <!--                  rules="required"-->
                <!--                  type="text"-->
                <!--                />-->
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
              <!--              <a @click.prevent="send">Отправить сообщение</a>-->
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
  name: 'ReviewsPage',
  fetchOnServer: false,
  mixins: [ErrorBaseMixin],

  data() {
    return {
      reviewsList: [],
      meta: {},
      form: {
        name: null,
        comment: null,
        g_recaptcha_response: null,
      },
      loader: false,
    }
  },

  async fetch() {
    const page = this.$route.query?.page || 1

    const response = await this.$axios.$get('/reviews', { params: { page } })
    // const response = await this.$axios.$get("/reviews", page)
    this.reviewsList = response.data
    this.meta = response.meta
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
        await this.$axios.$post('/reviews', this.form).then(() => {
          this.$bvModal.show('review-send')
          this.form.name = ''
          this.form.comment = ''
          this.$refs.observer.reset()
        })
      } catch (error) {
        this.takeErrorResponseWithObserver(error, this.$refs.loginObserver)
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
