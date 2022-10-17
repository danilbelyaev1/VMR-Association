<template>
  <b-modal
    id="companyCard-modal"
    hide-header-close
    hide-footer
    centered
    content-class="companyCard-content"
    header-class="companyCard-header"
    body-class="companyCard-body"
  >
    <template #modal-header="{}">
      <div class="bg">
        <h3 class="header-title">Карточка предприятия</h3>
        <button class="btnNone ic close" @click="close">
          <span aria-hidden="true" style="color: #ffffff">&times;</span>
        </button>
      </div>
    </template>

    <ul class="d-flex mt-4 flex-column" style="padding: 0 40px 10px 40px">
      <li v-if="name" class="mb-3">
        <div class="caption">Наименование предприятия</div>
        <div class="text">{{ name }}</div>
      </li>
      <li v-if="short_name" class="mb-3">
        <div class="caption">Краткое название</div>
        <div class="text">{{ short_name }}</div>
      </li>
      <li v-if="legal_address" class="mb-3">
        <div class="caption">Юридический адрес</div>
        <div class="text">{{ legal_address }}</div>
      </li>
      <li v-if="postal_address" class="mb-3">
        <div class="caption">Почтовый адрес</div>
        <div class="text">{{ postal_address }}</div>
      </li>
      <li v-if="phone" class="mb-3">
        <div class="caption">Телефон (Факс)</div>
        <div class="text">{{ phone }}</div>
      </li>
      <li v-if="email" class="mb-3">
        <div class="caption">Электронная почта</div>
        <div class="text">{{ email }}</div>
      </li>
      <li v-if="inn" class="mb-3">
        <div class="caption">Инн</div>
        <div class="text">{{ inn }}</div>
      </li>
      <li v-if="kpp && type === 2" class="mb-3">
        <div class="caption">КПП</div>
        <div class="text">{{ kpp }}</div>
      </li>
      <li v-if="ogrn" class="mb-3">
        <div class="caption">ОГРН</div>
        <div class="text">{{ ogrn }}</div>
      </li>
      <li v-if="bank_details" class="mb-3">
        <div class="caption">Банковские реквизиты</div>
        <div class="text">{{ bank_details }}</div>
      </li>
      <li v-if="okpo" class="mb-3">
        <div class="caption">ОКПО</div>
        <div class="text">{{ okpo }}</div>
      </li>
      <li v-if="okogu" class="mb-3">
        <div class="caption">ОКОГУ</div>
        <div class="text">{{ okogu }}</div>
      </li>
      <li v-if="okato" class="mb-3">
        <div class="caption">ОКАТО</div>
        <div class="text">{{ okato }}</div>
      </li>
      <li v-if="oktmo" class="mb-3">
        <div class="caption">ОКТМО</div>
        <div class="text">{{ oktmo }}</div>
      </li>
      <li v-if="okfs" class="mb-3">
        <div class="caption">ОКФС</div>
        <div class="text">{{ okfs }}</div>
      </li>
      <li v-if="okved" class="mb-3">
        <div class="caption">ОКВЕД</div>
        <div class="text">{{ okved }}</div>
      </li>
      <li v-if="director" class="mb-3">
        <div class="caption">Директор</div>
        <div class="text">{{ director }}</div>
      </li>
      <li v-if="director_power" class="mb-3">
        <div class="caption">Полномочия генерального директора</div>
        <div class="text">{{ director_power }}</div>
      </li>
      <li v-if="accountant" class="mb-3">
        <div class="caption">Главный бухгалтер</div>
        <div class="text">{{ accountant }}</div>
      </li>
    </ul>
  </b-modal>
</template>

<script>
export default {
  name: 'CompanyCardModal',
  props: {
    modalShow: {
      type: Boolean,
      default: false,
    },
    company: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    name() {
      return this.company?.name
    },
    short_name() {
      return this.company?.short_name
    },
    legal_address() {
      return this.company?.legal_address
    },
    postal_address() {
      return this.company?.postal_address
    },
    phone() {
      return this.company?.phone
    },
    email() {
      return this.company?.email
    },
    inn() {
      return this.company?.inn
    },
    ogrn() {
      return this.company?.ogrn
    },
    bank_details() {
      return this.company?.bank_details
    },
    okpo() {
      return this.company?.okpo
    },
    okogu() {
      return this.company?.okogu
    },
    oktmo() {
      return this.company?.oktmo
    },
    okato() {
      return this.company?.okato
    },
    okfs() {
      return this.company?.oktmo
    },
    okved() {
      return this.company?.oktmo
    },
    director() {
      return this.company?.director
    },
    director_power() {
      return this.company?.director_power
    },
    accountant() {
      return this.company?.accountant
    },
    kpp() {
      return this.company?.kpp
    },
    type() {
      return this.company?.type
    },
  },
  methods: {
    close() {
      this.$bvModal.hide('companyCard-modal')
    },
  },
}
</script>

<style scoped>
.bg {
  width: 100%;
  height: 90px;
  background-color: #009393;
}
.header-title {
  padding: 32px 0 24px 40px;
}
.caption {
  font-weight: 700;
  font-size: 14px;
  line-height: 130%;
  color: #bcbcbc;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.text {
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  color: #343947;
}
</style>
