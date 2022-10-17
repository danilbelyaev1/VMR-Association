<template>
  <b-modal
    id="login-form"
    hide-header-close
    centered
    footer-class="loginModal-footer"
  >
    <template #modal-header="{}">
      <button class="btnNone ic close" @click="close">
        <span aria-hidden="true">&times;</span>
      </button>
    </template>
    <h4 class="modal-title">Авторизация</h4>
    <div class="input-default1" style="padding: 0">
      <validation-observer
        ref="loginObserver"
        tag="form"
        @submit.prevent="login()"
      >
        <div class="col-12 mb-3">
          <input-validate
            ref="email"
            v-model.trim="form.email"
            :disable-root-classes="true"
            :disable-input-classes="true"
            vid="email"
            label="Логин"
            placeholder=""
            rules="required"
            type="email"
            error-class="b-error"
            autocomplete="on"
            @keydown.enter="login"
          />
        </div>
        <div class="restore">
          <a @click="redirectToRestore"> Забыли пароль? </a>
        </div>
        <div class="col-12">
          <input-validate
            ref="password"
            v-model="form.password"
            :disable-root-classes="true"
            :disable-input-classes="true"
            vid="password"
            label="Пароль"
            placeholder=""
            rules="required"
            :type="isPasswordVisible ? 'text' : 'password'"
            @keydown.enter="login"
          >
            <button
              class="btnNone ic btnPass"
              @click.prevent="togglePasswordVisible"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.5932 10.8117C23.1356 11.5212 23.1356 12.479 22.5932 13.1873C20.8847 15.4176 16.7857 20.0098 12.0002 20.0098C7.21461 20.0098 3.11563 15.4176 1.40716 13.1873C1.14326 12.8476 1 12.4297 1 11.9995C1 11.5694 1.14326 11.1514 1.40716 10.8117C3.11563 8.58143 7.21461 3.98926 12.0002 3.98926C16.7857 3.98926 20.8847 8.58143 22.5932 10.8117V10.8117Z"
                  stroke="#E0E0E0"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.0004 15.4324C13.8963 15.4324 15.4333 13.8954 15.4333 11.9994C15.4333 10.1034 13.8963 8.56641 12.0004 8.56641C10.1044 8.56641 8.56738 10.1034 8.56738 11.9994C8.56738 13.8954 10.1044 15.4324 12.0004 15.4324Z"
                  stroke="#E0E0E0"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </input-validate>
        </div>
      </validation-observer>
    </div>
    <template #modal-footer>
      <my-button
        class="btn btn-primary"
        text="Авторизация"
        :loader="isLoading"
        @click="login"
      />
      <div class="modal-footer-text text-2">
        Чтобы создать аккаунт,
        <a @click.prevent="redirectToRegister">подайте заявку </a> на получение
        доступа к маркетплейсу
      </div>
    </template>
  </b-modal>
</template>

<script>
import ErrorBaseMixin from '~/components/mixins/ErrorBaseMixin'

export default {
  name: 'LoginForm',
  mixins: [ErrorBaseMixin],
  props: {
    modalShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isLoading: false,
      isPasswordVisible: false,
      form: {
        password: null,
        email: null,
      },
    }
  },
  methods: {
    async login() {
      const isValid = await this.$refs.loginObserver.validate()
      if (!isValid) return

      this.isLoading = true

      try {
        const response = await this.$auth.loginWith('local', {
          data: this.form,
        })

        this.$auth.setUserToken(
          response.data.data.access_token,
          response.data.data.access_token
        )
        this.$auth.setUser(response.data.data.user)

        await this.$store.dispatch(
          'favourites/loadInitialFavourites',
          Boolean(this.$auth.user)
        )
        await this.$store.dispatch(
          'cart/loadInitialCart',
          Boolean(this.$auth.user)
        )
        await this.$store.dispatch('cart/loadCart', Boolean(this.$auth.user))

        await this.$router.push('/')
        await this.close()
      } catch (error) {
        this.takeErrorResponseWithObserver(error, this.$refs.loginObserver)
      }
      this.isLoading = false
    },
    async close() {
      await this.$bvModal.hide('login-form')
    },
    redirectToRestore() {
      this.close()
      this.$router.push('/restore-password')
    },
    redirectToRegister() {
      this.close()
      this.$router.push('/register')
    },
    togglePasswordVisible() {
      this.isPasswordVisible = !this.isPasswordVisible
    },
  },
}
</script>

<style scoped>
.restore {
  position: absolute;
  cursor: pointer;
  bottom: 58px !important;
  z-index: 100;
  right: 0;
  font-size: 14px;
  line-height: 140%;
  color: #bcbcbc;
}
</style>
