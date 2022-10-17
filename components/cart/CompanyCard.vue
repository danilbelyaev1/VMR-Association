<template>
  <div class="dial-companies-info-wrap">
    <slot></slot>
    <div v-if="fullName" class="info-company-card">
      <div class="info-company-card-title">Наименование предприятия</div>
      <div class="info-company-card-text">{{ fullName }}</div>
    </div>
    <div v-if="shortName" class="info-company-card">
      <div class="info-company-card-title">Краткое название</div>
      <div class="info-company-card-text">{{ shortName }}</div>
    </div>
    <div v-if="legalAddress" class="info-company-card">
      <div class="info-company-card-title">Юридический адрес</div>
      <div class="info-company-card-text">{{ legalAddress }}</div>
    </div>
    <div v-if="postalAddress" class="info-company-card">
      <div class="info-company-card-title">Почтовый адрес</div>
      <div class="info-company-card-text">{{ postalAddress }}</div>
    </div>
    <div v-if="phone" class="info-company-card">
      <div class="info-company-card-title">Телефон (Факс)</div>
      <div class="info-company-card-text">{{ phone }}</div>
    </div>
    <div v-if="email" class="info-company-card">
      <div class="info-company-card-title">Электронная почта</div>
      <div class="info-company-card-text">{{ email }}</div>
    </div>
    <div v-if="inn" class="info-company-card">
      <div class="info-company-card-title">Инн</div>
      <div class="info-company-card-text">{{ inn }}</div>
    </div>
    <div v-if="kpp && type === 2" class="info-company-card">
      <div class="info-company-card-title">КПП</div>
      <div class="info-company-card-text">{{ kpp }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompanyCard',
  fetchOnServer: false,

  props: {
    company: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comp: [],
    }
  },

  async fetch() {
    // try {
    //
    //   const url = '/companies'
    //   const response = await this.$axios.get(url)
    //
    //   this.comp = response.data || []
    //
    // }catch (e) {
    //
    // }
  },
  computed: {
    fullName() {
      return this.company?.name || ''
    },
    shortName() {
      return this.company?.short_name || ''
    },
    legalAddress() {
      return this.company?.legal_address || ''
    },
    postalAddress() {
      return this.company?.postal_address || ''
    },
    phone() {
      return this.company?.phone || ''
    },
    email() {
      return this.company?.email || ''
    },
    inn() {
      return this.company?.inn || ''
    },
    kpp() {
      return this.company?.kpp || ''
    },
    type() {
      return this.company?.type
    },
  },
}
</script>

<style scoped>
.info-company-card {
  max-width: 320px;
}
</style>
