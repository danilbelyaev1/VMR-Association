<template>
  <div
    v-click-outside="clickOutside"
    class="search"
    :class="[type, formClass]"
    @keydown.enter.prevent="() => {}"
  >
    <input-validate
      ref="inputDadata"
      v-model="searchValue"
      :class="formInputClass"
      :disable-root-classes="true"
      :disable-input-classes="true"
      :loading="loading"
      :rules="rules"
      :vid="vid"
      :name="privateName"
      :custom-messages="customMessages"
      :label="label"
      :mode="mode"
      :disabled="disabled"
      :show-error-class="showErrorClass"
      :error-message="errorMessage"
      :placeholder="placeholder"
      :fetch-pending="fetchPending"
      v-bind="$attrs"
      @input="debounceSearch"
      @focusin="debounceSearch(searchValue)"
      @focusout="showEmptySuggestions = false"
      v-on="inputListeners"
      @keydown.up="indexDown"
      @keydown.down="indexUp"
      @keydown.enter="selectByIndex"
    >
      <template #before>
        <slot name="before"></slot>
      </template>
      <template #after-nested-input>
        <div v-if="suggestions.length" class="select-wrap">
          <div class="placeholder">Выберите вариант или продолжите ввод</div>
          <div
            v-for="(suggestion, index) in suggestions"
            :key="index"
            class="select-item"
            :class="{
              'has-additional': !!suggestion.additional_value,
              active: index === activeIndex,
            }"
            @click="selectSuggestion(suggestion)"
          >
            <span v-text="suggestion.customValue || suggestion.value"></span>
            <span
              v-if="suggestion.additional_value"
              class="additional"
              v-text="suggestion.additional_value"
            ></span>
          </div>
        </div>
        <div v-else-if="emptySuggestions" class="select-wrap">
          <span class="placeholder" v-text="emptySuggestions" />
        </div>
      </template>
      <template #after>
        <slot name="after"></slot>
      </template>
    </input-validate>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import ClickOutside from 'vue-click-outside'
// import DadataAddressModel from '~/plugins/vue-dadata/DadataAddressModel'
// import DadataTypeEnum, {
//   DADATA_TYPE_ADDRESS,
//   DADATA_TYPE_CITY,
//   DADATA_TYPE_FIO,
//   DADATA_TYPE_FLAT,
//   DADATA_TYPE_ORGANIZATION,
//   DADATA_TYPE_INN,
// } from '~/plugins/vue-dadata/DadataTypeEnum'
// import { DadataOrganizationModel } from '~/plugins/vue-dadata/DadataOrganizationModel'
// import { StringHelper } from '~/helpers'
// import { DadataNameModel } from '~/plugins/vue-dadata/DadataNameModel'

const objectGet = (o, p) => {
  return p.split('.').reduce((a, x) => (a && a[x] ? a[x] : null), o)
}

export default {
  name: 'DadataSuggestions',

  directives: {
    ClickOutside,
  },

  model: {
    prop: 'value',
  },

  props: {
    fetchPending: {
      type: Boolean,
      default: false,
    },
    showErrorClass: {
      type: Boolean,
      default: true,
    },
    disableRootClasses: {
      type: Boolean,
      default: false,
    },
    formClass: {
      type: [String, Object, Array],
      default: 'w-100',
    },
    type: {
      type: [String, Boolean],
      required: true,
    },
    supportingSuggestion: {
      type: Object,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    mode: {
      type: String,
      default: 'eager',
    },
    placeholder: {
      type: String,
      default: null,
    },
    customMessages: {
      type: Object,
      default: null,
    },
    rules: {
      type: [String, Object],
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    searchFullAddress: {
      type: Boolean,
      default: false,
    },
    showFullAddress: {
      type: Boolean,
      default: false,
    },
    formInputClass: {
      type: String,
      default: null,
    },
    force: {
      type: Boolean,
      default: true,
    },
    vid: {
      type: String,
      default: null,
    },
    // eslint-disable-next-line vue/require-prop-types,vue/require-default-prop
    value: {},
  },

  data() {
    return {
      searchValue: this.value,
      suggestions: [],
      loading: false,
      errorMessage: null,
      errorTimer: null,
      showEmptySuggestions: false,
      activeIndex: null,
    }
  },

  computed: {
    privateName() {
      if (this.name !== null) {
        return this.name
      }

      const str = objectGet(this, '$vnode.data.model.expression') || ''
      return str.split('.').pop() || null
    },
    inputName() {
      return this.name || this?.$vnode?.data?.model?.expression
    },
    inputListeners() {
      return Object.assign({}, this.$listeners, {
        input: (value) => this.$emit('input', value),
      })
    },
    emptySuggestions() {
      if (
        !this.showEmptySuggestions ||
        this.loading ||
        !!this.suggestions.length
      ) {
        return null
      }

      return 'По данному запросу мы ничего не нашли, попробуйте изменить запрос'
    },
    countSuggestions() {
      return this.suggestions.length
    },
  },

  watch: {
    value(value) {
      this.searchValue = value
    },
  },

  methods: {
    debounceSearch: debounce(function (value) {
      return this.search(value)
    }, 900),

    close() {
      this.clearSuggestions()
      this.$emit('close')
    },

    search(value) {
      this.showEmptySuggestions = false

      if (!value || !this.fetchData()) return this.clearSuggestions()

      this.loading = true
      this.fetchData().finally(() => {
        this.loading = false
        this.showEmptySuggestions = !this.suggestions.length

        if (!this.$refs.inputDadata.$el.contains(document.activeElement)) {
          this.clearSuggestions()
        }
      })
    },

    /**
     * Запрос на получение подсказок
     * @return {Promise<any>}
     */
    fetchData() {
      // switch (this.type) {
      //   case DADATA_TYPE_CITY:
      //     return this.fetchCities()
      //   case DADATA_TYPE_ADDRESS:
      //     return this.fetchAddress()
      //   case DADATA_TYPE_FLAT:
      //     return this.fetchFlat()
      //   case DADATA_TYPE_ORGANIZATION:
      //     return this.fetchOrganization()
      //   case DADATA_TYPE_FIO:
      //     return this.fetchFio()
      //   case DADATA_TYPE_INN:
      //     return this.fetchInn()
      //   default:
      //     return null
      return this.fetchAll()
    },

    fetchAll() {
      return this.$axios
        .$post('/search/companies', { value: this.searchValue })
        .then((response) => {
          this.suggestions = response.data.map((dadata) => dadata)
          console.log(response)
        })
    },

    // /**
    //    * Запрос на получение подсказок городов
    //    * @return {Promise<any>}
    //    */
    //   fetchCities() {
    //     return this.$axios
    //       .$post('/geo/cities', { query: this.searchValue })
    //       .then((response) => {
    //         this.suggestions = response.data.map(
    //           (dadata) => new DadataAddressModel(dadata)
    //         )
    //       })
    //   },
    //
    //   /**
    //    * Запрос на получение подсказок адресов
    //    * @return {Promise<any>}
    //    */
    //   fetchAddress() {
    //     const data = { query: this.searchValue }
    //     if (this.searchFullAddress) {
    //       data.city = {}
    //     } else if (this.supportingSuggestion) {
    //       data.city = this.supportingSuggestion
    //     }
    //
    //     return this.$axios.$post('/geo/addresses', data).then((response) => {
    //       this.suggestions = response.data
    //         .map((dadata) => {
    //           const data = new DadataAddressModel(dadata)
    //           if (this.showFullAddress) {
    //             data.setCustomValue(data.value)
    //           } else {
    //             data.setCustomValue(
    //               data.getAddressWithHistoryName(true) || data.value
    //             )
    //           }
    //
    //           return data
    //         })
    //         .filter((address) => !!address.customValue)
    //     })
    //   },
    //
    //   /**
    //    * Запрос на получение подсказок квартир
    //    * @return {Promise<any>}
    //    */
    //   fetchFlat() {
    //     const data = {
    //       query: this.searchValue,
    //     }
    //     if (this.supportingSuggestion) {
    //       data.city = this.supportingSuggestion
    //       data.query = StringHelper.contains(
    //         [
    //           this.supportingSuggestion.getStreetWithHouse(true),
    //           this.searchValue,
    //         ],
    //         ' '
    //       )
    //     }
    //
    //     return this.$axios.$post('/geo/addresses', data).then((response) => {
    //       this.suggestions = response.data
    //         .map((dadata) => {
    //           const data = new DadataAddressModel(dadata)
    //           data.setCustomValue(data.getFlat(true))
    //           return data
    //         })
    //         .filter((address) => !!address.customValue)
    //     })
    //   },
    //
    //   /**
    //    * Fetch cities by BIC number (INN)
    //    * @return {Promise<any>}
    //    */
    //
    //   fetchInn() {
    //     return this.$axios
    //       .$post('/geo/organizations', { query: this.searchValue })
    //       .then((response) => {
    //         this.suggestions = response.data.map((responseItem) => {
    //           const dadata = new DadataOrganizationModel(responseItem)
    //
    //           dadata.additional_value = StringHelper.contains(
    //             [
    //               dadata.inn,
    //               dadata.address.getFullAddressWithoutPostalCode(true),
    //             ],
    //             '  '
    //           )
    //
    //           return dadata
    //         })
    //       })
    //   },
    //
    //   /**
    //    * Запрос на получение подсказок организаций
    //    * @return {Promise<any>}
    //    */
    //   fetchOrganization() {
    //     return this.$axios
    //       .$post('/geo/organizations', { query: this.searchValue })
    //       .then((response) => {
    //         this.suggestions = response.data.map((response) => {
    //           const dadata = new DadataOrganizationModel(response)
    //           dadata.additional_value = StringHelper.contains(
    //             [
    //               dadata.inn,
    //               dadata.address.getFullAddressWithoutPostalCode(true),
    //             ],
    //             ' '
    //           )
    //           return dadata
    //         })
    //       })
    //   },
    //
    //   /**
    //    * Запрос на получение подсказок имени и фамилии
    //    * @return {Promise<any>}
    //    */
    //   fetchFio() {
    //     return this.$axios
    //       .$post('/site/names', { query: this.searchValue })
    //       .then((response) => {
    //         this.suggestions = response.data.map((response) => {
    //           return new DadataNameModel(response)
    //         })
    //       })
    //   },

    clearSuggestions() {
      this.showEmptySuggestions = false
      this.suggestions = []
      this.$emit('clearSuggestion')
    },

    selectSuggestion(suggestion) {
      this.clearSuggestions()
      this.$emit('selectSuggestion', suggestion)
    },

    clickOutside() {
      if (!this.force) {
        return this.clearSuggestions()
      }

      const suggestion = this.suggestions.find(() => true)
      if (suggestion) {
        this.selectSuggestion(suggestion)
      }
    },

    changeIndex(index) {
      this.activeIndex = index
    },

    indexDown() {
      if (!this.countSuggestions) {
        this.activeIndex = null
        return
      }

      let nextIndex = Number.isInteger(this.activeIndex)
        ? this.activeIndex - 1
        : this.countSuggestions - 1

      if (nextIndex < 0) {
        nextIndex = null
      }

      this.changeIndex(nextIndex)
    },

    indexUp() {
      if (!this.countSuggestions) {
        this.activeIndex = null
        return
      }

      let nextIndex = Number.isInteger(this.activeIndex)
        ? this.activeIndex + 1
        : 0

      if (nextIndex >= this.countSuggestions) {
        nextIndex = null
      }

      this.changeIndex(nextIndex)
    },

    selectByIndex() {
      if (!this.countSuggestions || this.activeIndex === null) {
        return
      }

      const selected = this.suggestions[this.activeIndex]
      if (selected) {
        this.selectSuggestion(selected)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.select-wrap {
  display: flex;
  position: absolute;
  flex-direction: column;
  z-index: 100;
  background-color: #343947;
  border: 1px solid #4a4a4a;
  border-radius: 0 0 5px 5px;
  width: 100%;

  .select-item {
    cursor: pointer;
    padding: 5px 2px;

    &:hover,
    &.active {
      background-color: #e1e1e1;
    }
  }

  .placeholder {
    font-size: 12px;
    color: #999999;
    padding: 5px 2px;
  }
}
</style>
