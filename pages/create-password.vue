<template>
  <main class="content">
    <section class="autho-section">
      <div class="container">
        <div class="container-autho">
          <h2>Создайте пароль<br />для вашего аккаунта</h2>
          <div class="your-login">
            <h6>Ваш логин</h6>
            <div class="login h6">{{ email }}</div>
          </div>
          <ValidationObserver
            ref="observer"
            v-slot="{ invalid }"
            tag="form"
            class=""
            @submit.prevent=""
          >
            <input-validate
              ref="password"
              v-model="form.password"
              :disable-root-classes="true"
              :disable-input-classes="true"
              :show-error-block="false"
              vid="password"
              label="Придумайте пароль"
              placeholder=""
              :rules="{
                required: true,
                regex: passwordRegex,
              }"
              :type="isPasswordVisible ? 'text' : 'password'"
            >
              <button class="btnNone ic btnPass" @click="togglePasswordVisible">
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
              <label class="label-quality">
                <span class="text-3">{{ passwordQuality.text }}</span>
                <span class="password-quality-wrap">
                  <span
                    :class="passwordQuality.class"
                    class="password-quality-bg"
                  ></span>
                </span>
              </label>
            </input-validate>
            <div class="password-quality-warning-wrapper mt-2">
              <div
                :class="
                  isPasswordHasValidLength
                    ? ' password-quality-warning-true'
                    : 'password-quality-warning-false'
                "
                class="text-3 password-quality-warning"
              >
                <img
                  :src="isPasswordHasValidLength ? '/true.svg' : '/false.svg'"
                  alt="validation-icon,иконка валидации"
                />
                <span class="text-3"
                  >Пароль должен содержать не менее 8 знаков</span
                >
              </div>
              <div
                :class="
                  isPasswordHasUpperAndLowerCase
                    ? ' password-quality-warning-true'
                    : 'password-quality-warning-false'
                "
                class="text-3 password-quality-warning"
              >
                <img
                  :src="
                    isPasswordHasUpperAndLowerCase ? '/true.svg' : '/false.svg'
                  "
                  alt="validation-icon,иконка валидации"
                />
                <span class="text-3">Строчные и прописные буквы</span>
              </div>
              <div
                :class="
                  isPasswordHasDigit
                    ? ' password-quality-warning-true'
                    : 'password-quality-warning-false'
                "
                class="text-3 password-quality-warning"
              >
                <img
                  :src="isPasswordHasDigit ? '/true.svg' : '/false.svg'"
                  alt="validation-icon,иконка валидации"
                />
                <span class="text-3">Хотя бы одну цифру</span>
              </div>
            </div>
            <my-button
              text="Сохранить и авторизоваться"
              class="btn-primary"
              :disabled="invalid || loader"
              :loader="loader"
              @click="submit"
            />
          </ValidationObserver>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { passwordRegex } from '~/helpers'

export default {
  name: 'CreatePassPage',
  asyncData(context) {
    const email = context.route.query.email
    const token = context.route.query.token
    return { email, token }
  },
  data() {
    return {
      passwordRegex,
      isPasswordVisible: false,
      validLength: 8,
      email: '',
      token: '',
      form: {
        password: '',
        password_confirmation: '',
      },
      loader: false,
    }
  },
  computed: {
    isPasswordHasDigit() {
      return /^(?=.*\d)/.test(this.form.password)
    },
    isPasswordHasUpperAndLowerCase() {
      return /^(?=.*[A-Z])(?=.*[a-z])/.test(this.form.password)
    },
    isPasswordHasValidLength() {
      return this.form.password.length >= this.validLength
    },
    passwordQuality() {
      switch (
        this.isPasswordHasDigit +
        this.isPasswordHasUpperAndLowerCase +
        this.isPasswordHasValidLength
      ) {
        case 2: {
          return { text: 'Ненадежный', class: 'yellow' }
        }
        case 3: {
          return { text: 'Надежный', class: 'green' }
        }
        default: {
          return { text: 'Ненадежный', class: 'red' }
        }
      }
    },
  },
  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate()
      if (this.passwordQuality.text === 'Надежный' && isValid) {
        this.loader = true

        this.form.password_confirmation = this.form.password
        const form = Object.assign(
          this.form,
          { email: this.email },
          { token: this.token }
        )

        try {
          const createPasswordResponse = await this.$axios.$post(
            '/auth/create-password',
            form,
            {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
            }
          )
          if (createPasswordResponse) {
            const loginData = {
              email: this.email,
              password: this.form.password,
            }
            try {
              const loginResponse = await this.$auth.loginWith('local', {
                data: loginData,
              })
              await this.$auth.setUser(loginResponse.data.data.user)
              await this.$router.push('/')
            } catch (e) {}
          }
        } catch (e) {
        } finally {
          this.loader = false
        }
      }
    },
    togglePasswordVisible() {
      this.isPasswordVisible = !this.isPasswordVisible
    },
  },
}
</script>

<style scoped></style>
