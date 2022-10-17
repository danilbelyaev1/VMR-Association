<template>
  <b-modal
    id="signatoryModal"
    hide-header-close
    hide-footer
    centered
    size="lg"
    no-stacking
  >
    <template #modal-header="{}">
      <h4 class="modal-title">Проверьте данные подписанта</h4>
      <button class="btnNone ic close" @click="close">
        <span aria-hidden="true">&times;</span>
      </button>
    </template>
    <ValidationObserver
      ref="observerSignatories"
      v-slot="{ invalid }"
      tag="form"
      class=""
      @submit.prevent=""
    >
      <input-validate
        ref="signatories_surname"
        v-model="signatories.surname"
        :disable-root-classes="true"
        :disable-input-classes="true"
        input-class="inmodal"
        error-class="b-error"
        vid="signatories_surname"
        label="Фамилия"
        placeholder=""
        rules="ru_only|required"
        type="text"
        class="mt-2"
      />
      <input-validate
        ref="signatories_name"
        v-model="signatories.name"
        :disable-root-classes="true"
        :disable-input-classes="true"
        input-class="inmodal"
        error-class="b-error"
        vid="signatories_name"
        label="Имя"
        placeholder=""
        rules="ru_only|required"
        type="text"
        class="mt-2"
      />
      <input-validate
        ref="signatories_patronymic"
        v-model="signatories.patronymic"
        :disable-root-classes="true"
        :disable-input-classes="true"
        input-class="inmodal"
        error-class="b-error"
        vid="signatories_patronymic"
        label="Отчество"
        placeholder=""
        rules="ru_only|required"
        type="text"
        class="mt-2"
      />
      <input-validate
        ref="signatories_job_title"
        v-model="signatories.job_title"
        :disable-root-classes="true"
        :disable-input-classes="true"
        input-class="inmodal"
        error-class="b-error"
        vid="signatories_job_title"
        label="Должность"
        placeholder=""
        rules="ru_only|required"
        type="text"
        class="mt-2"
      />
      <div class="wrapTextarea position-relative w-100 mt-2">
        <label for="description" class="label" style="color: #bcbcbc"
          >На основании чего (укажите в родительном падеже)</label
        >
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
            style="
              height: 104px;
              background-color: #ffffff !important;
              color: #343947 !important;
              border: solid 1px #bcbcbc !important;
            "
            :style="failed ? 'border: 1px solid #D05359 !important;' : ''"
          />
          <div class="b-error" v-text="errors.join(', ')" />
        </ValidationProvider>
      </div>
      <footer class="modal-footer">
        <div class="row justify-content-center">
          <my-button
            :disabled="loader || invalid"
            class="btn btn-primary"
            :loader="loader"
            text="Подтвердить и подписать"
            @click="sign"
          />
        </div>
      </footer>
    </ValidationObserver>
  </b-modal>
</template>

<script>
import { isEqual } from 'lodash/lang'
import ErrorBaseMixin from '~/components/mixins/ErrorBaseMixin'

export default {
  name: 'SignatoryModal',
  mixins: [ErrorBaseMixin],
  fetchOnServer: false,

  props: {
    modalShow: {
      type: Boolean,
      default: false,
    },
    dealId: {
      type: [Number, String, null],
      default: null,
    },
    isUserSigningSecond: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loader: false,
      signatories: {
        id: null,
        name: '',
        surname: null,
        patronymic: null,
        job_title: null,
        based: null,
        is_main: true,
      },
      signatoriesFromFetch: {},
    }
  },
  async fetch() {
    try {
      const urlSignatories = '/signatories'
      const responseSignatories = await this.$axios.$get(urlSignatories)
      this.signatoriesList = responseSignatories.data
      if (this.signatoriesList[0]) {
        this.signatoriesFromFetch = { ...this.signatoriesList[0] }
        this.signatories = { ...this.signatoriesList[0] }
      }
    } catch (e) {
      this.error = e.response?.data?.message || 'Ошибка сервера'
      this.$bvModal.show('errorModal')
    }
  },
  computed: {
    formInvalid() {
      return this.$refs.observerSignatories.validate()
    },
  },
  methods: {
    async close() {
      await this.$bvModal.hide('signatoryModal')
    },
    async sign() {
      this.loader = true
      const isValid = await this.$refs.observerSignatories.validate()
      if (!isValid) {
        return
      }
      if (
        isEqual(this.signatories, this.signatoriesFromFetch) ||
        !this.isUserSigningSecond
      ) {
        this.$emit('on-sign', this.signatories)
        await this.close()
      } else {
        this.$emit('on-new-signatory', this.signatories)
        await this.close()
      }
      this.loader = false
    },
  },
}
</script>

<style scoped>
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
