<template>
  <main class="content">
    <BreadCrumbs />
    <section class="add-offer">
      <div class="container">
        <div class="row">
          <div class="col-9">
            <div class="marketplace-wrapper add-offer">
              <h2>Новый товар</h2>
            </div>
          </div>
        </div>
        <ValidationObserver
          ref="OfferObserver"
          v-slot="{ errors, invalid }"
          tag="form"
          class=""
          @submit.prevent=""
        >
          <div class="radio-wrapper col-9 pb-3">
            <input
              id="radio-1"
              v-model="offer.type"
              checked
              type="radio"
              name="company_type"
              class="radio"
              :value="1"
            />
            <label for="radio-1" class="mr-3">Реалтайм</label>
            <input
              id="radio-2"
              v-model="offer.type"
              type="radio"
              name="company_type"
              class="radio"
              :value="2"
            />
            <label for="radio-2">Фьючерс</label>
          </div>
          <div class="col-9">
            <div class="row">
              <div class="col-6 pb-3">
                <ValidationProvider
                  v-slot="{ errors, failed }"
                  ref="vmrType"
                  rules="required"
                  name="Вид ВМР"
                  vid="vmr_type"
                >
                  <my-select
                    :select-id="1"
                    label="Вид ВМР"
                    :options="vmr_type"
                    @select="selectType"
                  />
                  <div
                    v-if="failed"
                    class="b-error"
                    v-text="errors.join(', ')"
                  />
                </ValidationProvider>
              </div>
              <div class="col-6 pb-3">
                <input-validate
                  ref="impurityPercentage"
                  v-model="offer.impurity_percent"
                  :disable-root-classes="true"
                  :disable-input-classes="true"
                  error-class="b-error"
                  vid="impurityPercentage"
                  label="Процент примеси"
                  placeholder=""
                  rules="required|between:0,100"
                  type="number"
                  :max-val="100"
                  :min-val="1"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-6 pb-3">
                <input-validate
                  ref="price"
                  v-model="offer.price"
                  :disable-root-classes="true"
                  :disable-input-classes="true"
                  error-class="b-error"
                  vid="price"
                  label="Цена за единицу, в рублях"
                  placeholder=""
                  rules="required|numeric"
                  type="number"
                  :min-val="'1'"
                  :max-val="'999999999'"
                />
                <my-select-min
                  :select-id="2"
                  label=""
                  :options="current_units"
                  @select="selectUnit"
                />
              </div>
              <div class="col-3 pb-3">
                <input-validate
                  ref="sale_from"
                  v-model="offer.sale_from"
                  :disable-root-classes="true"
                  :disable-input-classes="true"
                  error-class="b-error"
                  vid="sale_from"
                  label="Продажа от, ед."
                  placeholder=""
                  rules="required|numeric"
                  type="number"
                  :min-val="1"
                />
              </div>
              <div class="col-3 pb-3">
                <input-validate
                  ref="quantity"
                  v-model="offer.quantity"
                  :disable-root-classes="true"
                  :disable-input-classes="true"
                  error-class="b-error"
                  vid="quantity"
                  label="Количество в наличии"
                  placeholder=""
                  rules="required|numeric"
                  type="number"
                  :min-val="1"
                />
              </div>
            </div>
            <div v-if="offer.type === 2" class="row">
              <div class="col-6 pb-3">
                <div class="date-picker">
                  <ValidationProvider
                    v-slot="{ errors, failed }"
                    rules="required"
                    name="Дата (от)"
                    vid="date_from"
                  >
                    <p class="label-name">Дата (от)</p>
                    <date-picker
                      ref="date_from"
                      v-model="offer.date_from"
                      v-mask="dateMask"
                      type="date"
                      value-type="format"
                      format="YYYY-MM-DD"
                      :disabled-date="disabledAfterMaxAndBeforeToday"
                      placeholder="гггг-мм-дд"
                    />
                    <div
                      v-if="failed"
                      class="b-error"
                      v-text="errors.join(', ')"
                    />
                  </ValidationProvider>
                </div>
                <!--                <input-validate-->
                <!--                  ref="date_from"-->
                <!--                  v-model='offer.date_from'-->
                <!--                  :disable-root-classes="true"-->
                <!--                  :disable-input-classes="true"-->
                <!--                  vid="date_from"-->
                <!--                  label='Дата (от)'-->
                <!--                  placeholder=""-->
                <!--                  rules='required'-->
                <!--                  type='date'-->
                <!--                  :max-val='offer.date_to'-->
                <!--                />-->
              </div>
              <div class="col-6 pb-3">
                <div class="date-picker">
                  <ValidationProvider
                    v-slot="{ errors, failed }"
                    rules="required"
                    name="Дата (до)"
                    vid="date_to"
                  >
                    <p class="label-name">Дата (до)</p>
                    <date-picker
                      ref="date_to"
                      v-model="offer.date_to"
                      v-mask="dateMask"
                      type="date"
                      value-type="format"
                      format="YYYY-MM-DD"
                      :disabled-date="disabledBeforeMin"
                      placeholder="гггг-мм-дд"
                    />
                    <div
                      v-if="failed"
                      class="b-error"
                      v-text="errors.join(', ')"
                    />
                  </ValidationProvider>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 mb-3">
                <div class="wrapTextarea position-relative w-100">
                  <label for="description" class="label">Комментарий</label>
                  <textarea
                    id="description"
                    v-model="offer.description"
                    class=""
                  />
                </div>
              </div>
            </div>
            <div class="row align-items-center">
              <div class="col-6 pb-3">
                <label class="label">Фото ВМР</label>
                <input-file
                  id="image"
                  ref="image"
                  :disable-root-classes="true"
                  :disable-input-classes="true"
                  vid="image"
                  placeholder="image"
                  rules="size:5000|ext_pic:jpg,png,jpeg,webp"
                  type="file"
                  image
                  @change-file="changeFileHandler"
                  @remove-file="removeFileHandler"
                />
              </div>
            </div>
            <div class="row align-items-center">
              <div v-if="image" class="col-6 pb-3">
                <img :src="image" alt="" height="200" width="100%" />
              </div>
            </div>
          </div>
          <div v-if="isLicenseBlock" class="col-9">
            <h4 class="w-100 my-4">Основание (лицензия)</h4>
            <div class="row">
              <div class="col-12 mb-3">
                <div class="wrapTextarea position-relative w-100">
                  <label for="description" class="label"
                    >Продавец осуществляет свою деятельность на основании
                    лицензии на осуществление деятельности по
                  </label>
                  <ValidationProvider
                    v-slot="{ errors, failed }"
                    rules="required"
                    name="Основание"
                    vid="license_activity"
                  >
                    <textarea
                      id="description2"
                      ref="license_activity"
                      v-model="offer.license_activity"
                      class=""
                      style="height: 90px"
                    />
                    <div
                      v-if="failed"
                      class="b-error"
                      v-text="errors.join(', ')"
                    />
                  </ValidationProvider>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 mb-3">
                <div class="date-picker">
                  <p class="label-name">от (число)</p>
                  <ValidationProvider
                    v-slot="{ errors, failed }"
                    rules="required"
                    vid="license_date"
                    name="Дата получения лицензии"
                  >
                    <date-picker
                      ref="license_date"
                      v-model="offer.license_date"
                      :disabled-date="disabledAfterToday"
                      type="date"
                      value-type="YYYY-MM-DD"
                      format="«D» MMMM YYYYг."
                      placeholder="Выберите дату"
                    />
                    <div
                      v-if="failed"
                      class="b-error"
                      v-text="errors.join(', ')"
                    />
                  </ValidationProvider>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 mb-4">
                <input-validate
                  ref="license_number"
                  v-model="offer.license_number"
                  :disable-root-classes="true"
                  :disable-input-classes="true"
                  error-class="b-error"
                  vid="license_number"
                  label="№ (номер)"
                  placeholder=""
                  rules="required"
                  type="number"
                  class=""
                />
              </div>
            </div>
          </div>
          <div class="col-9">
            <my-button
              :disabled="loader || invalid"
              class="btn btn-primary send"
              :loader="loader"
              text="Добавить товар"
              @click="submit"
            />
            <div
              v-for="(error, index) in errors"
              :key="index"
              class="err"
              v-text="error.join(', ')"
            />
          </div>
        </ValidationObserver>
      </div>
    </section>
    <client-only>
      <DefaultModal
        modal-class=""
        close-button-text="Понятно"
        modal-id="defaultModal"
        :title="dModal.title"
        :text="dModal.text"
        :html="dModal.html"
        @close="closeAndRedirect"
      />
    </client-only>
  </main>
</template>

<script>
// import {imageUrlOrNotFound} from "~/helpers";

import ErrorBaseMixin from '~/components/mixins/ErrorBaseMixin'

export default {
  name: 'AddOffer',
  fetchOnServer: true,
  mixins: [ErrorBaseMixin],
  middleware: 'auth',

  data() {
    return {
      offer: {
        type: 1,
        product_id: null,
        unit_id: 1,
        price: null,
        quantity: null,
        impurity_percent: null,
        date_from: null,
        date_to: null,
        sale_from: null,
        image: null,
        description: '',
        license_activity: '',
        license_date: '',
        license_number: '',
        reason: {
          text: null,
          date: null,
          number: null,
        },
      },
      products_data: null,
      cur_units: [1],
      loader: false,
      url: null,
      dateMask: '####-##-##',
      dModal: {
        title: '',
        text: '',
        html: '',
      },
      validation: {
        license: true,
        offer: true,
      },
    }
  },
  async fetch() {
    this.offer.license_activity =
      this.$auth?.user?.company?.license_activity || ''
    this.offer.license_date = this.$auth?.user?.company?.license_date || ''
    this.offer.license_number = this.$auth?.user?.company?.license_number || ''
    try {
      this.products_data = await this.$axios.$get('/products?include=units')
    } catch (e) {}
  },
  computed: {
    vmr_type() {
      return this.products_data?.data
    },
    current_units() {
      return this.products_data?.units?.filter((e) =>
        this.cur_units?.includes(e.id)
      )
    },
    dateFromTimeStamp() {
      return Date.parse(this.offer.date_from)
    },
    dateToTimeStamp() {
      return Date.parse(this.offer.date_to)
    },
    image() {
      if (this.url) {
        return this.url
      }
      return null
    },
    isLicenseBlock() {
      return !(
        this.$auth?.user?.company?.license_activity &&
        this.$auth?.user?.company?.license_date &&
        this.$auth?.user?.company?.license_number
      )
    },
  },
  mounted() {},
  methods: {
    disabledBeforeMin(date) {
      return date < this.dateFromTimeStamp
    },
    disabledAfterMaxAndBeforeToday(date) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return date > this.dateToTimeStamp || date < today
    },
    disabledAfterToday(date) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return date > today
    },
    dateChange() {
      return null
    },
    selectType(option) {
      this.offer.product_id = option.id
      this.cur_units = option.units
      this.$refs.vmrType.validate(option.id)
    },
    selectUnit(option) {
      this.offer.unit_id = option.id
    },
    changeFileHandler(file, ref, valid) {
      if (valid) {
        this.url = window.URL.createObjectURL(file)
      }
      this.offer[ref] = file
    },
    removeFileHandler(ref, valid) {
      this.offer[ref] = null
      this.url = null
    },
    async submit() {
      this.loader = true
      const isValid = await this.$refs.OfferObserver.validate()
      if (!isValid) {
        this.loader = false
        return
      }

      if (this.isLicenseBlock) {
        const url = '/profile/company'
        try {
          await this.$axios
            .$post(url, {
              license_number: this.offer.license_number,
              license_activity: this.offer.license_activity,
              license_date: this.offer.license_date,
            })
            .then(() => {
              this.dModal.text =
                '*Лицензия успешно изменена, позже вы можите изменить ее в личном кабинете.'
            })
        } catch (e) {
          this.takeErrorResponseWithObserver(e, this.$refs.LicenseObserver)
          return
        }
      }

      const formData = new FormData()

      formData.append('type', this.offer.type)
      formData.append('product_id', this.offer.product_id)
      formData.append('unit_id', this.offer.unit_id)
      formData.append('description', this.offer.description)
      formData.append('price', this.offer.price)
      formData.append('quantity', this.offer.quantity)
      formData.append('sale_from', this.offer.sale_from)
      formData.append('impurity_percent', this.offer.impurity_percent)
      if (this.offer.image) {
        formData.append('image', this.offer.image)
      }
      if (this.offer.type === 2) {
        formData.append('date_from', this.offer.date_from)
        formData.append('date_to', this.offer.date_to)
      }

      try {
        await this.$axios
          .$post('/offers', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then(() => {
            this.dModal.title = 'Товар создан'
            this.$bvModal.show('defaultModal')
          })
      } catch (e) {
        this.takeErrorResponseWithObserver(e, this.$refs.OfferObserver)
      } finally {
        this.loader = false
      }
    },
    closeAndRedirect() {
      this.$bvModal.hide('defaultModal')
      this.$router.push('/my-goods')
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
.err {
  color: #d05359;
  font-size: 14px;
}
</style>
