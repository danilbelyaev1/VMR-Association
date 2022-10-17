<template>
  <div v-if="!$fetchState.pending" class="marketplace-inputs row">
    <client-only>
      <div class="col-3">
        <my-select
          :select-id="1"
          label="Регион"
          :options="regions"
          @select="selectRegion"
        />
      </div>
      <div class="col-3">
        <my-select
          :select-id="2"
          label="Вид ВМР"
          :options="products"
          @select="selectProduct"
        />
      </div>
      <div class="col-3">
        <my-select
          searchable
          :select-id="4"
          label="Поставщики"
          :options="companies"
          @select="selectCompany"
        />
      </div>
      <div class="col-3">
        <my-select
          :select-id="5"
          label="Реалтайм / Фьючерс"
          :options="type"
          @select="selectType"
        />
      </div>
      <div class="col-3">
        <div class="range">
          <p class="label-name">Цена</p>
          <my-range
            :max-val="prices.max"
            :min-val="prices.min"
            :value="[prices.min, prices.max]"
            @change="selectSelectedPrice"
          />
        </div>
      </div>
      <div class="col-3">
        <div class="range">
          <p class="label-name">Рейтинг</p>
          <my-range
            :max-val="5"
            :min-val="1"
            :step="0.1"
            :interval="0.1"
            :value="[1, 5]"
            @change="selectRating"
          />
        </div>
      </div>
      <div class="col-3">
        <div class="date-picker">
          <p class="label-name">Срок поставки</p>
          <date-picker
            v-model="date"
            v-mask="dateMask"
            type="month"
            value-type="format"
            format="YYYY-MM"
            placeholder="Выберите месяц"
            @change="dateChange"
          />
        </div>
      </div>
      <div class="col-3 percent">
        <my-select-multiple
          :select-id="3"
          label="Процент примеси"
          :options="impurity_percentage"
          @select="selectImpurityPercentage"
        />
      </div>
      <div class="col-12 reset">
        <div class="reset-filters" @click="resetFilters">
          Сбросить фильтры
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.22517 0.810985C2.03657 0.628827 1.78397 0.528033 1.52177 0.530311C1.25957 0.53259 1.00876 0.637759 0.823352 0.823167C0.637944 1.00858 0.532775 1.25939 0.530497 1.52158C0.528218 1.78378 0.629013 2.03638 0.811171 2.22499L6.58617 7.99999L0.810171 13.775C0.714661 13.8672 0.638478 13.9776 0.586069 14.0996C0.53366 14.2216 0.506074 14.3528 0.504921 14.4856C0.503767 14.6184 0.529068 14.75 0.579349 14.8729C0.62963 14.9958 0.703883 15.1075 0.797776 15.2014C0.891669 15.2953 1.00332 15.3695 1.12622 15.4198C1.24911 15.4701 1.38079 15.4954 1.51357 15.4942C1.64635 15.4931 1.77757 15.4655 1.89958 15.4131C2.02158 15.3607 2.13192 15.2845 2.22417 15.189L8.00017 9.41399L13.7752 15.189C13.9638 15.3711 14.2164 15.4719 14.4786 15.4697C14.7408 15.4674 14.9916 15.3622 15.177 15.1768C15.3624 14.9914 15.4676 14.7406 15.4698 14.4784C15.4721 14.2162 15.3713 13.9636 15.1892 13.775L9.41417 7.99999L15.1892 2.22499C15.3713 2.03638 15.4721 1.78378 15.4698 1.52158C15.4676 1.25939 15.3624 1.00858 15.177 0.823167C14.9916 0.637759 14.7408 0.53259 14.4786 0.530311C14.2164 0.528033 13.9638 0.628827 13.7752 0.810985L8.00017 6.58599L2.22517 0.809985V0.810985Z"
              fill="#01FFDB"
            />
          </svg>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'CatalogFilter',

  fetchOnServer: false,

  data() {
    return {
      price: [1, 3000],
      rating: [0, 5],
      date: null,
      selectedTypes: {},
      dateMask: '####-##',
    }
  },

  async fetch() {
    await this.$store.dispatch('filter/fetchPricesAndImpurityPercentage')
    await this.$store.dispatch('filter/fetchRegions')
    await this.$store.dispatch('filter/fetchProducts')
    await this.$store.dispatch('filter/fetchCompanies')
  },
  computed: {
    regions() {
      return this.$store.getters['filter/getRegions']
    },
    products() {
      return this.$store.getters['filter/getProducts']
    },
    companies() {
      return this.$store.getters['filter/getCompanies']
    },
    impurity_percentage() {
      return this.$store.getters['filter/getImpurityPercentage']
    },
    type() {
      return this.$store.getters['filter/getType']
    },
    prices() {
      return this.$store.getters['filter/getPrices']
    },
  },

  methods: {
    dateChange() {
      this.$store.commit('filter/setMonth', this.date)
      this.$emit('filter-change')
    },
    selectType(option) {
      this.$store.commit('filter/setSelectedType', option.id)
      this.$emit('filter-change')
    },
    selectRegion(option) {
      this.$store.commit('filter/setSelectedRegion', option.id)
      this.$emit('filter-change')
    },
    selectProduct(option) {
      this.$store.commit('filter/setSelectedProduct', option.id)
      this.$emit('filter-change')
    },
    selectCompany(option) {
      this.$store.commit('filter/setSelectedCompany', option.id)
      this.$emit('filter-change')
    },
    selectImpurityPercentage(option) {
      this.$store.commit('filter/setSelectedImpurityPercentage', option)
      this.$emit('filter-change')
    },
    selectRating(rating) {
      this.$store.commit('filter/setRating', rating)
      this.$emit('filter-change')
    },
    selectSelectedPrice(price) {
      this.$store.commit('filter/setSelectedPrice', price)
      this.$emit('filter-change')
    },
    resetFilters() {
      this.$store.commit('filter/reset')
      this.$emit('filter-change')

      // todo реализовать без перезагрузки страницы
      window.location.reload()
    },
  },
}
</script>

<style scoped>
.range {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  margin-top: 16px;
}
.date-picker {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  margin-top: 16px;
}
</style>
