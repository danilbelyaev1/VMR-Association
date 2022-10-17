<template>
  <div class="col px-0 wrapPersAccountSettings">
    <h4 class="w-100 mb-4">Данные пользователя</h4>
    <ValidationObserver
      ref="observer-personal"
      v-slot="{}"
      tag="form"
      class=""
      @submit.prevent=""
    >
      <div class="row">
        <div class="col-4 mb-3">
          <input-validate
            ref="user_phone"
            v-model="form.phone"
            v-mask="phoneMask"
            :disable-root-classes="true"
            :disable-input-classes="true"
            error-class="b-error"
            vid="user_phone"
            label="Телефон"
            placeholder="+7"
            rules="required"
            type="text"
            :value="form.phone"
            class=""
          >
            <div class="btnNone ic btnPass hover">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="9"
                  stroke="#6F727D"
                  stroke-width="2"
                />
                <path
                  d="M11.2441 4.948C11.2441 4.766 11.1461 4.668 10.9641 4.668H9.92815C9.74615 4.668 9.64815 4.766 9.64815 4.948L9.57815 11.486C9.57815 11.668 9.67615 11.766 9.85815 11.766H11.0341C11.2161 11.766 11.3141 11.668 11.3141 11.486L11.2441 4.948ZM11.3421 13.502C11.3421 13.32 11.2441 13.222 11.0621 13.222H9.69015C9.50815 13.222 9.41015 13.32 9.41015 13.502V14.72C9.41015 14.902 9.50815 15 9.69015 15H11.0621C11.2441 15 11.3421 14.902 11.3421 14.72V13.502Z"
                  fill="#6F727D"
                />
              </svg>
              <div class="hover-balloon">
                При смене номера телефона потребуется подтверждение
              </div>
            </div>
          </input-validate>
        </div>
        <div
          class="col-4 mb-3 d-flex align-items-center"
          style="margin-top: 33px"
        >
          <a
            v-if="currentValues.isNewPhone"
            href=""
            @click.prevent="changePhone(currentValues.phone, form.phone)"
            v-text="'Отправить SMS для подтверждения'"
          />
          <a
            v-if="!currentValues.isNewPhone && newPhoneInput"
            href=""
            @click.prevent="changePhone(currentValues.phone, form.phone)"
            v-text="'Изменить номер телефона'"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-4 mb-3">
          <input-validate
            ref="user_email"
            v-model="form.email"
            :disable-root-classes="true"
            :disable-input-classes="true"
            error-class="b-error"
            vid="user_email"
            label="Почта"
            placeholder="Email"
            rules="required|email"
            type="text"
            class=""
          >
            <div class="btnNone ic btnPass hover">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="9"
                  stroke="#6F727D"
                  stroke-width="2"
                />
                <path
                  d="M11.2441 4.948C11.2441 4.766 11.1461 4.668 10.9641 4.668H9.92815C9.74615 4.668 9.64815 4.766 9.64815 4.948L9.57815 11.486C9.57815 11.668 9.67615 11.766 9.85815 11.766H11.0341C11.2161 11.766 11.3141 11.668 11.3141 11.486L11.2441 4.948ZM11.3421 13.502C11.3421 13.32 11.2441 13.222 11.0621 13.222H9.69015C9.50815 13.222 9.41015 13.32 9.41015 13.502V14.72C9.41015 14.902 9.50815 15 9.69015 15H11.0621C11.2441 15 11.3421 14.902 11.3421 14.72V13.502Z"
                  fill="#6F727D"
                />
              </svg>
              <div class="hover-balloon">
                При смене e-mail потребуется подтверждение
              </div>
            </div>
          </input-validate>
        </div>
        <div
          class="col-4 mb-3 d-flex align-items-center"
          style="margin-top: 33px"
        >
          <a
            v-if="newEmailInput"
            href=""
            @click.prevent="changeEmail(currentValues.email, form.email)"
          >
            Изменить Email
          </a>
          <a
            v-if="!newEmailInput && currentValues.isNewEmail"
            href=""
            @click.prevent="changeEmail(currentValues.email, form.email)"
          >
            Отправить ссылку для подтверждения
          </a>
        </div>
      </div>
      <div class="row">
        <div class="col-4 mb-4">
          <input-validate
            ref="user_job_title"
            v-model="form.job_title"
            :disable-root-classes="true"
            :disable-input-classes="true"
            error-class="b-error"
            vid="user_job_title"
            label="Должность"
            placeholder=""
            rules="ru_only|required"
            type="text"
            class=""
          />
        </div>
      </div>
      <div
        class="persAccountSettingsBtn w-100 d-flex flex-wrap align-items-center"
      >
        <my-button
          :disabled="loaders.personal"
          class="btn btn-primary changePassBtn"
          :loader="loaders.personal"
          text="Сохранить"
          @click="changeProfile"
        />
      </div>
    </ValidationObserver>
    <ValidationObserver
      ref="observerSignatories"
      v-slot="{ invalid }"
      tag="form"
      class=""
      @submit.prevent=""
    >
      <h4 class="w-100 mt-4" style="margin-bottom: 8px">Данные подписанта</h4>
      <h6 class="w-100 mb-4">Укажите все поля в родительном падеже</h6>
      <div class="row">
        <div class="col-4 mb-3">
          <input-validate
            ref="signatories_surname"
            v-model="signatories.surname"
            :disable-root-classes="true"
            :disable-input-classes="true"
            error-class="b-error"
            vid="signatories_surname"
            label="Фамилия"
            placeholder="Иванова"
            rules="ru_only|required"
            type="text"
            class="mt-4"
          />
        </div>
        <div class="col-4 mb-3">
          <input-validate
            ref="signatories_name"
            v-model="signatories.name"
            :disable-root-classes="true"
            :disable-input-classes="true"
            error-class="b-error"
            vid="signatories_name"
            label="Имя"
            placeholder="Ивана"
            rules="ru_only|required"
            type="text"
            class="mt-4"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <input-validate
            ref="signatories_patronymic"
            v-model="signatories.patronymic"
            :disable-root-classes="true"
            :disable-input-classes="true"
            error-class="b-error"
            vid="signatories_patronymic"
            label="Отчество"
            placeholder="Ивановича"
            rules="ru_only|required"
            type="text"
            class="mt-4"
          />
        </div>
        <div class="col-4 mb-3">
          <input-validate
            ref="signatories_job_title"
            v-model="signatories.job_title"
            :disable-root-classes="true"
            :disable-input-classes="true"
            error-class="b-error"
            vid="signatories_job_title"
            label="Должность"
            placeholder="Директора"
            rules="ru_only|required"
            type="text"
            class="mt-4"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-8 mb-3">
          <div class="wrapTextarea position-relative w-100">
            <label for="description" class="label">На основании чего </label>
            <ValidationProvider
              v-slot="{ errors, failed }"
              rules="required"
              name="Основание"
              vid="based"
            >
              <textarea
                id="description"
                v-model="signatories.based"
                class=""
                style="height: 130px"
                :style="failed ? 'border: 1px solid #D05359 !important;' : ''"
                placeholder="Устава"
              />
              <div class="b-error" v-text="errors.join(', ')" />
            </ValidationProvider>
          </div>
        </div>
      </div>
      <my-button
        :disabled="loaders.signatories || invalid"
        class="btn btn-primary changePassBtn mt-3"
        :loader="loaders.signatories"
        :text="isAnySignatory ? 'Изменить подписанта' : 'Создать подписанта'"
        @click="changeSignatory"
      />
    </ValidationObserver>
    <ValidationObserver
      ref="observerLicense"
      v-slot="{ invalid }"
      tag="form"
      class=""
      @submit.prevent=""
    >
      <h4 class="w-100 my-4">Основание (лицензия)</h4>
      <div class="row">
        <div class="col-8 mb-3">
          <div class="wrapTextarea position-relative w-100">
            <label for="description" class="label"
              >Продавец осуществляет свою деятельность на основании лицензии на
              осуществление деятельности по
            </label>
            <ValidationProvider
              v-slot="{ errors, failed }"
              rules="required"
              name="Деятельность лицензии"
              vid="license_activity"
            >
              <textarea
                id="description2"
                v-model="license.license_activity"
                class=""
                style="height: 90px"
                :style="failed ? 'border: 1px solid #D05359 !important;' : ''"
              />
              <div class="b-error" v-text="errors.join(', ')" />
            </ValidationProvider>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-8 mb-3">
          <div class="date-picker">
            <p class="label-name">от (число)</p>
            <ValidationProvider
              v-slot="{ errors, failed }"
              rules="required"
              name="Дата лицензии"
              vid="license_date"
            >
              <date-picker
                v-model="license.license_date"
                type="date"
                value-type="YYYY-MM-DD"
                format="«D» MMMM YYYYг."
                placeholder="Выберите дату"
                :style="
                  failed
                    ? 'border: 1px solid #D05359 !important; border-radius: 10px;'
                    : ''
                "
              />
              <div class="b-error" v-text="errors.join(', ')" />
            </ValidationProvider>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-8 mb-2">
          <input-validate
            ref="user_job_title"
            v-model="license.license_number"
            :disable-root-classes="true"
            :disable-input-classes="true"
            error-class="b-error"
            vid="user_job_title"
            label="№ (номер)"
            name="Номер лицензии"
            placeholder=""
            rules="required"
            type="number"
            class=""
          />
        </div>
      </div>
      <my-button
        :disabled="loaders.license || invalid"
        class="btn btn-primary changePassBtn mt-3"
        :loader="loaders.license"
        text="Изменить лицензию"
        @click="changeLicense"
      />
    </ValidationObserver>
    <ValidationObserver
      ref="observer-password"
      v-slot="{ invalid }"
      tag="form"
      class=""
      @submit.prevent=""
    >
      <h4 class="w-100 my-4">Сменить пароль</h4>
      <div class="row align-items-end">
        <div class="col-4 mb-3">
          <input-validate
            ref="current_password"
            v-model="form.current_password"
            :disable-root-classes="true"
            :disable-input-classes="true"
            :show-error-block="false"
            vid="current_password"
            label="Старый пароль"
            placeholder=""
            rules="required"
            :type="isOldPasswordVisible ? 'text' : 'password'"
          >
            <button
              class="btnNone ic btnPass"
              @click="toggleOldPasswordVisible"
            >
              <svg
                :class="isOldPasswordVisible ? 'svg_active' : ''"
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
        <div class="col-4 mb-3">
          <input-validate
            ref="password"
            v-model="form.password"
            :disable-root-classes="true"
            :disable-input-classes="true"
            :show-error-block="false"
            vid="password"
            label="Новый пароль"
            placeholder=""
            :rules="{
              required: true,
              regex: passwordRegex,
            }"
            :type="isNewPasswordVisible ? 'text' : 'password'"
          >
            <button
              class="btnNone ic btnPass"
              @click="toggleNewPasswordVisible"
            >
              <svg
                :class="isNewPasswordVisible ? 'svg_active' : ''"
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
        <div v-if="form.password" class="col-4 mb-3">
          <div class="text-3">Пароль должен содержать не менее 8 знаков</div>
          <div class="text-3">Строчные и прописные буквы</div>
          <div class="text-3">Хотя бы одну цифру</div>
        </div>
      </div>
      <div
        class="persAccountSettingsBtn w-100 d-flex flex-wrap align-items-center"
      >
        <my-button
          :disabled="loaders.personal || invalid"
          class="btn btn-primary changePassBtn mt-3"
          :loader="loaders.personal"
          text="Сохранить изменения"
          @click="changePassword"
        />
        <button class="btnNone btnText mt-3" @click="logout">
          Выйти из аккаунта
        </button>
      </div>
    </ValidationObserver>

    <client-only>
      <SmsConfirm :phone="form.phone || ''" @confirm="updatePersonal" />
      <DefaultModal
        modal-class=""
        close-button-text="Понятно"
        modal-id="defaultModal"
        :title="dModal.title"
        :text="dModal.text"
      />
      <DefaultModal
        modal-class=""
        close-button-text="Понятно"
        modal-id="errorModal"
        :title="error"
      />
    </client-only>
  </div>
</template>

<script>
import { passwordRegex, StringHelper } from '~/helpers'
import ErrorBaseMixin from '~/components/mixins/ErrorBaseMixin'

export default {
  name: 'PersonalSetting',
  fetchOnServer: true,
  mixins: [ErrorBaseMixin],
  data() {
    return {
      passwordRegex,
      form: {
        phone: '',
        email: '',
        job_title: '',
        current_password: '',
        password: '',
        password_confirmation: '',
      },
      signatories: {
        id: null,
        name: '',
        surname: null,
        patronymic: null,
        job_title: null,
        based: null,
        is_main: true,
      },
      license: {
        license_activity: null,
        license_date: null,
        license_number: null,
      },
      currentValues: {
        phone: null,
        email: null,
        job_title: null,
        isNewPhone: false,
        isNewEmail: false,
        signatories: {
          name: '',
          surname: null,
          patronymic: null,
          job_title: null,
          based: null,
          is_main: true,
        },
      },
      dModal: {
        title: '',
        text: '',
      },
      phoneMask: '+7 (###) ###-##-##',
      profile: {},
      signatoriesList: [],
      loaders: {
        personal: false,
        signatories: false,
        license: false,
      },
      isOldPasswordVisible: false,
      isNewPasswordVisible: false,
      error: '',
    }
  },
  async fetch() {
    const url = '/profile'
    const params = new URLSearchParams()
    params.append('include', 'company')
    const response = await this.$axios.$get(url, {
      params,
    })

    this.profile = response.data

    this.form.phone = this.profile?.phone
    this.form.email = this.profile?.email
    this.form.job_title = this.profile?.job_title

    this.currentValues.phone = this.profile?.phone
    this.currentValues.email = this.profile?.email
    this.currentValues.job_title = this.profile?.job_title

    this.license.license_activity = this.profile?.company?.license_activity
    this.license.license_date = this.profile?.company?.license_date
    this.license.license_number = this.profile?.company?.license_number

    const urlSignatories = '/signatories'
    const responseSignatories = await this.$axios.$get(urlSignatories)
    this.signatoriesList = responseSignatories.data
    if (this.signatoriesList[0]) {
      this.signatories = this.signatoriesList[0]
    }
  },
  computed: {
    newPhoneInput() {
      return (
        '+' + StringHelper.onlyNumbers(this.form.phone) !==
        this.currentValues.phone
      )
    },
    newEmailInput() {
      return this.currentValues.email !== this.form.email
    },
    isAnySignatory() {
      return Boolean(this.signatoriesList[0])
    },
  },
  watch: {
    profile(value) {
      if (value?.new_phone) {
        this.currentValues.isNewPhone = true
        this.currentValues.phone = value?.new_phone
        this.form.phone = value?.new_phone
      } else {
        this.currentValues.isNewPhone = false
        this.currentValues.phone = value?.phone
        this.form.phone = value?.phone
      }
      if (value?.new_email) {
        this.currentValues.isNewEmail = true
        this.currentValues.email = value?.new_email
        this.form.email = value?.new_email
      } else {
        this.currentValues.isNewEmail = false
        this.currentValues.email = value?.email
        this.form.email = value?.email
      }
      this.currentValues.job_title = value?.job_title
    },
  },
  mounted() {},
  methods: {
    toggleConfirmPasswordVisible() {
      this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible
    },
    toggleOldPasswordVisible() {
      this.isOldPasswordVisible = !this.isOldPasswordVisible
    },
    toggleNewPasswordVisible() {
      this.isNewPasswordVisible = !this.isNewPasswordVisible
    },
    async changePhone(oldPhone, newPhone) {
      const newPhoneFormatted = '+' + StringHelper.onlyNumbers(newPhone)
      if (oldPhone === newPhoneFormatted) {
        return
      }
      const url = '/auth/change-phone'

      try {
        const response = await this.$axios.$post(url, {
          phone: newPhoneFormatted,
        })
        this.profile = response.data
        this.$bvModal.show('sms-form')
      } catch (e) {
        this.error = e.response?.data?.message || 'Ошибка сервера'
        this.$bvModal.show('errorModal')
      }
    },
    async changeEmail(
      oldEmail,
      newEmail,
      redirect = 'https://vmr.media-sfera.com/'
    ) {
      if (oldEmail === newEmail) {
        return
      }
      const url = '/auth/change-email'

      try {
        const response = await this.$axios.$post(url, {
          email: newEmail,
          redirect_url: redirect,
        })
        this.profile = response.data
        this.dModal.title = 'Email изменен'
        this.dModal.text = `На новый email ${newEmail} придет письмо с сылкой для подтвержения`
        this.$bvModal.show('defaultModal')
      } catch (e) {
        this.error = e.response?.data?.message || 'Ошибка сервера'
        this.$bvModal.show('errorModal')
      }
    },
    async changeLicense() {
      const isValid = await this.$refs.observerLicense.validate()
      if (!isValid) {
        return
      }
      this.loaders.license = true
      // const formData = new FormData(this.$refs.observerLicense.$el)
      const url = '/profile/company'

      try {
        await this.$axios
          .$post(url, {
            license_number: this.license.license_number,
            license_activity: this.license.license_activity,
            license_date: this.license.license_date,
          })
          .then(() => {
            this.dModal.title = 'Сведения о лицензии успешно изменены'
            this.$bvModal.show('defaultModal')
          })
      } catch (e) {
        this.takeErrorResponseWithObserver(e, this.$refs.observer)
      } finally {
        this.loaders.license = false
      }
    },
    async changeSignatory() {
      this.loaders.signatories = true
      try {
        if (this.signatoriesList[0]) {
          const url = `/signatories/${this.signatories.id}`
          const response = await this.$axios.$patch(url, {
            surname: this.signatories.surname,
            name: this.signatories.name,
            patronymic: this.signatories.patronymic,
            job_title: this.signatories.job_title,
            based: this.signatories.based,
            is_main: true,
          })
          this.signatories = response.data
          this.dModal.title = 'Сведения о подписанте успешно изменены'
          this.$bvModal.show('defaultModal')
        } else {
          const url = '/signatories'
          const response = await this.$axios.$post(url, {
            surname: this.signatories.surname,
            name: this.signatories.name,
            patronymic: this.signatories.patronymic,
            job_title: this.signatories.job_title,
            based: this.signatories.based,
            is_main: true,
          })
          this.signatories = response.data
          this.dModal.title = 'Сведения о подписанте успешно созданы'
          this.$bvModal.show('defaultModal')
        }
      } catch (e) {
        this.takeErrorResponseWithObserver(e, this.$refs.observerSignatories)
      } finally {
        this.loaders.signatories = false
      }
    },
    async changeProfile() {
      try {
        await this.changePhone(this.currentValues.phone, this.form.phone)
        await this.changeEmail(
          this.currentValues.email,
          this.form.email,
          'https://vmr.media-sfera.com/'
        )

        if (this.form.job_title !== this.currentValues.job_title) {
          const url = '/profile'
          const response = await this.$axios.$post(url, {
            job_title: this.form.job_title,
          })
          this.profile = response.data
        }
        this.dModal.title = 'Данные сохранены'
        this.$bvModal.show('defaultModal')
      } catch (e) {
        this.error = e.response?.data?.message || 'Ошибка сервера'
        this.$bvModal.show('errorModal')
      }
    },
    async changePassword() {
      try {
        if (this.form.current_password && this.form.password) {
          const url = '/profile/password'
          const response = await this.$axios.$post(url, {
            current_password: this.form.current_password,
            password: this.form.password,
            password_confirmation: this.form.password,
          })
          this.form.current_password = ''
          this.form.password = ''
          this.profile = response.data
          this.dModal.title = 'Новый пароль сохранен'
          this.$bvModal.show('defaultModal')
          this.$refs['observer-password'].reset()
        }
      } catch (e) {
        this.error = e.response?.data?.message || 'Ошибка сервера'
        this.$bvModal.show('errorModal')
      }
    },
    verify(result) {
      alert(result)
    },
    updatePersonal(profile) {
      this.profile = {}
      this.profile = profile.profile
    },
    async logout() {
      await this.$store.commit('cart/setCartToDefault')
      await this.$store.dispatch('favourites/removeFavouritesOnLogOut')
      await this.$auth.logout()
      // location.reload()
    },
  },
}
</script>

<style scoped>
.svg_active path {
  stroke: #01ffdb;
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
.label {
  color: #bcbcbc;
}
</style>
